const styleSchema = require('../../../config/styleSchema.js').default;

module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Column Section',
  controls: {
    position: 'bottom-left'
  },
  addFields: [
    {
      name: 'backgroundColor',
      type: 'color',
      label: 'Background color',
    },
    {
      name: 'backgroundImage',
      type: 'attachment',
      label: 'Background image',
      svgImages: true,
      trash: true
    },
    {
      name:     'containerId',
      type:     'string',
      label:    'HTML Container id (must be unique on the page for css)',
    },
    {
      name: 'displayType',
      label: 'Columns',
      type: 'select',
      required: true,
      help: 'Select the number of columns and their relative width',
      choices: [
        {
          label: 'Full page width ',
          value: 'full-width',
        },
        {
          label: 'One column: 100%',
          value: 'columns-one',
        },
        {
          label: 'Two Columns: 50% - 50%',
          value: 'columns-half',
        },
        {
          label: 'Two Columns: 33% - 66%',
          value: 'columns-onethird',
        },
        {
          label: 'Two Columns: 66% - 33%',
          value: 'columns-twothird-onethird',
        },
        {
          label: 'Two Columns: 75% - 25%',
          value: 'columns-twothird-full',
        },
        {
          label: 'Two Columns: 25% - 75%',
          value: 'columns-onefourth',
        },
        {
          label: 'Two Columns: Desktop: 75% - 25%, Tablet:  66% - 33%',
          value: 'columns-twothird',
        },
        {
          label: 'Three Columns: 25% - 50% - 25%',
          value: 'columns-onefourth-half',
        },
        {
          label: 'Three columns: 33% - 33% - 33%',
          value: 'columns-three',
        },
        {
          label: 'Four Columns: 25% - 25% - 25% - 25%',
          value: 'columns-four',
        },
        {
          label: 'Full screen (vertical & horizontal)',
          value: 'full-screen',
        },


      /*  {
          label: 'icons',
          value: 'icons',
        }, */
      ]
    },
    {
      name: 'area1',
      type: 'area',
      label: 'Area 1',
      contextual: true
    },
    {
      name: 'area2',
      type: 'area',
      label: 'Area 2',
      contextual: true
    },
    {
      name: 'area3',
      type: 'area',
      label: 'Area 3',
      contextual: true
    },
    {
      name: 'area4',
      type: 'area',
      label: 'Area 4',
      contextual: true
    },
    styleSchema.definition('containerStyles', 'Styles for the container'),
    {
      name: 'marginType',
      label: 'Margin type',
      type: 'select',
      required: true,
      choices: [
        {
          label: 'Normal',
          value: 'normal'
        },
        {
          label: 'Shift upwards',
          value: 'up'
        }
      ]
    },
    {
      name: 'htmlId',
      type: 'string',
      label: 'HTML ID',
    },
    {
      name: 'htmlClass',
      type: 'string',
      label: 'HTML Class',
    },
    {
      type: 'boolean',
      name: 'sectionToggle',
      default: true,
      label: 'Show section as toggle-section',
      help: 'The visibility of a toggle-section can be switched on and off by the user.',
      choices: [
        {
          value: true,
          label: "Yes",
          showFields: [
            'sectionOpen', 'mobileToggle', 'toggleTitle'
          ]
        },
        {
          value: false,
          label: "No"
        },
      ]
    },
    {
      name: 'toggleTitle',
      type: 'string',
      label: 'Title of the toggle-section',
      help: `The title will always be visible. By clicking on the title the section's visibility toggles.`,
    },
    {
      type: 'boolean',
      name: 'sectionOpen',
      default: true,
      label: 'Toggle-section open by default?',
      choices: [
        {
          value: true,
          label: "Open"
        },
        {
          value: false,
          label: "closed"
        },
      ]
    },
    {
      type: 'boolean',
      name: 'mobileToggle',
      default: true,
      label: 'Show toggle-section on mobile only',
      choices: [
        {
          value: true,
          label: "Yes"
        },
        {
          value: false,
          label: "No"
        },
      ]
    },

  ],

  construct: function(self, options) {
    options.arrangeFields = (options.arrangeFields || []).concat([
      {
        name: 'basic',
        label: 'Basic',
        fields: ['displayType']
      },
      {
        name: 'sectionToggleTab',
        label: 'Toggle-section',
        fields: ['sectionToggle', 'toggleTitle', 'sectionOpen', 'mobileToggle']
      },
      {
        name: 'styling',
        label: 'Styling',
        fields: ['backgroundColor', 'backgroundImage', 'containerStyles']
      },
      {
        name: 'advanced',
        label: 'Advanced',
        fields: ['containerId', 'marginType', 'htmlId', 'htmlClass']
      }
    ]);

    const superPushAssets = self.pushAssets;
    self.pushAssets = function () {
      superPushAssets();
      self.pushAsset('stylesheet', 'main', { when: 'always' });
    };

    const superLoad = self.load;

    self.load = function (req, widgets, callback) {
      return superLoad(req, widgets, function (err) {
        if (err) {
          return callback(err);
        }

        widgets.forEach((widget) => {
          if (widget.containerStyles) {
            widget.containerId = widget.containerId ? widget.containerId : styleSchema.generateId();
            widget.formattedContainerStyles = styleSchema.format(widget.containerId, widget.containerStyles);
          }
        });
        return callback(null);
      });
    };

  }
};
