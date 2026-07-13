import fs from "node:fs";

const path = "src/app/builder/page.tsx";

if (!fs.existsSync(path)) {
  console.error(`Missing ${path}`);
  process.exit(1);
}

let source = fs.readFileSync(path, "utf8");

const importNeedle =
  'import { DigitalBackground } from "@/components/studio/digital-background";';

if (!source.includes('from "@/components/studio/resudite-brand"')) {
  if (!source.includes(importNeedle)) {
    console.error("Could not find the DigitalBackground import.");
    process.exit(1);
  }

  source = source.replace(
    importNeedle,
    `${importNeedle}\nimport { ResuditeBrand } from "@/components/studio/resudite-brand";`,
  );
}

const oldBlock = `            <div className="flex items-center gap-3">
              <Link
                href="/projects"
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 font-black text-cyan-300 transition hover:bg-cyan-300/15"
              >
                R
              </Link>

              <div>
                <p className="font-extrabold">Resudite Studio</p>
                <p className="text-xs text-slate-400">
                  {project.name} · {templateNames[project.templateId]}
                </p>
              </div>
            </div>`;

const newBlock = `            <ResuditeBrand
              href="/projects"
              subtitle={\`\${project.name} · \${templateNames[project.templateId]}\`}
              compact
            />`;

if (source.includes(oldBlock)) {
  source = source.replace(oldBlock, newBlock);
  fs.writeFileSync(path, source);
  console.log("Builder branding updated.");
} else if (source.includes("<ResuditeBrand")) {
  console.log("Builder branding was already updated.");
} else {
  console.error(
    "The builder header was not recognised. No existing builder code was overwritten.",
  );
  process.exit(1);
}
