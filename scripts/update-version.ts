import fs from 'fs-extra';
import path from 'node:path';

export async function updateVersion(version: string) {
  const packageJsonPath = path.join(process.cwd(), 'package/package.json');
  const originalPackageJson = await fs.readJson(packageJsonPath);

  const updatedPackageJson = { ...originalPackageJson };
  updatedPackageJson.version = version;

  await fs.writeJson(packageJsonPath, updatedPackageJson, { spaces: 2 });

  return () => fs.writeJson(packageJsonPath, originalPackageJson, { spaces: 2 });
}
