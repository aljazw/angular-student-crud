import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const CustomAuraPreset = definePreset(Aura, {
    semantic: {
        colorScheme: {
            light: {
                custom: {
                    0: '{neutral.50}',
                    50: '{neutral.200}',
                    100: '{neutral.300}',
                    200: '{neutral.400}',
                    300: '{neutral.600}',
                    950: '{neutral.950}',
                },
            },
            dark: {
                custom: {
                    0: '{neutral.950}',
                    50: '{neutral.900}',
                    100: '{neutral.800}',
                    200: '{neutral.700}',
                    300: '{neutral.600}',
                    950: '{neutral.50}',
                },
            },
        },
    },
});

export default CustomAuraPreset;
