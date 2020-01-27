const styleSchema = require('../../../config/styleSchema.js').default;
const textFieldType = process.env.USE_RICH_TEXT_FIELDS === 'yes' ? 'singleton' : 'text';
const widgetType = textFieldType === 'singleton' ? 'apostrophe-rich-text' : null;


if (textFieldType === 'text') {
    var descriptionBlock = {
        name: 'description',
        label: 'Description',
    //    type: textFieldType,
        type: 'string',
        textarea: true,
    };
} else {
    var descriptionBlock = {
        name: 'description',
        label: 'Description',
        type: textFieldType,
        widgetType: widgetType
    };
}

module.exports = {
    extend:    'apostrophe-widgets',
    label:     'Slider',
    addFields: [
        {
            name:       'items',
            label:      'Items',
            type:       'array',
            titleField: 'title',
            schema:     [
                {
                    type:  'string',
                    name:  'title',
                    label: 'Title'
                },
                descriptionBlock,
                {
                    type:  'attachment',
                    name:  'image',
                    label: 'Image'
                },
                {
                  name: 'linkUrl',
                  type: 'text',
                  label: 'Link URL',
                  type: 'string',
                  help: 'If not empty, it shows a link at the bottom of the item.'
                },
                {
                  name: 'linkTitle',
                  type: 'text',
                  label: 'Link title',
                  type: 'string',
                  help: 'If not empty, it shows a link at the bottom of the item.'
                },
            ]
        },
        styleSchema.definition('containerStyles', 'Styles for the container')
    ],
    construct: function (self, options) {
        options.arrangeFields = (options.arrangeFields || []).concat([
            {
                name: 'itemsgroup',
                label: 'Items',
                fields: ['items']
            },
            {
                name: 'stylinggroup',
                label: 'Styling',
                fields: ['containerStyles']
            }
        ])

        const superLoad = self.load;

        self.load = (req, widgets, callback) => {
            widgets.forEach((widget) => {
                if (widget.containerStyles) {
                    const containerId               = styleSchema.generateId();
                    widget.containerId              = containerId;
                    widget.formattedContainerStyles = styleSchema.format(containerId, widget.containerStyles);
                }
            });

            return superLoad(req, widgets, callback);
        }


        var superPushAssets = self.pushAssets;
        self.pushAssets     = () => {
            superPushAssets();
            self.pushAsset('stylesheet', 'main', {when: 'always'});
            self.pushAsset('script', 'slider', {when: 'always'});
        };
    }
};
