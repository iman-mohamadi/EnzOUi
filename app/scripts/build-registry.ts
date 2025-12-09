import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ESM modules (Nuxt uses ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIGURATION ---
const OUTPUT_DIR = path.join(__dirname, "../../public/registry");

// Define your components here.
// You can add more objects to this array later for new components.
const COMPONENTS = [
    {
        name: "wheel-picker",
        dependencies: ["@vueuse/core"],
        files: [
            "WheelPicker.vue",
            "WheelPickerWrapper.vue",
        ]
    },
    {
        name: "ambient-grid",
        dependencies: ["clsx", "tailwind-merge"],
        files: [
            "AmbientGrid.vue"
        ]
    }
];

const build = () => {
    // 1. Create Output Directory
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // 2. Loop through every component
    COMPONENTS.forEach((component) => {
        const componentDir = path.join(__dirname, `../components/ui/${component.name}`);
        const fileList = [];

        // Read each file defined in the config
        component.files.forEach((fileName) => {
            const filePath = path.join(componentDir, fileName);

            try {
                const content = fs.readFileSync(filePath, "utf-8");
                fileList.push({
                    path: `${component.name}/${fileName}`,
                    content: content,
                    type: "registry:ui",
                });
            } catch (error) {
                console.error(`❌ Error reading ${fileName} for ${component.name}:`, error);
                process.exit(1);
            }
        });

        // 3. Generate index.ts content dynamically
        // (This replaces your manual indexContent string so it's always accurate)
        const indexContent = `export { default as WheelPicker } from './WheelPicker.vue'
export { default as WheelPickerWrapper } from './WheelPickerWrapper.vue'
export type { WheelPickerOption } from './WheelPicker.vue'
`;

        fileList.push({
            path: `${component.name}/index.ts`,
            content: indexContent,
            type: "registry:ui",
        });

        // 4. Construct the Registry JSON item
        const registryItem = {
            name: component.name,
            type: "registry:ui",
            dependencies: component.dependencies,
            files: fileList,
        };

        // 5. Write the JSON file to public/registry/
        const outputPath = path.join(OUTPUT_DIR, `${component.name}.json`);
        fs.writeFileSync(outputPath, JSON.stringify(registryItem, null, 2));

        console.log(`✅ Registry built: public/registry/${component.name}.json`);
    });
};

build();