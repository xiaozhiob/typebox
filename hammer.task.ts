import { folder, shell } from '@sinclair/hammer'

// Cleans this projects build artifacts.
export async function clean() {
    await folder('target').delete()
}

// Runs the specs for this project.
export async function spec(target = 'target/spec') {
    await shell(`hammer build ./spec/index.ts --dist ${target} --platform node`)
    await shell(`mocha ${target}/index.js`)
}

// Runs the example in watch mode.
export async function example(target = 'target/example') {
    await shell(`hammer run example/index.ts --dist ${target}`)
}

// Builds this package and packs it for npm publishing.
export async function build(target = 'target/build') {
    await folder(target).delete()
    await shell(`tsc -p ./src/tsconfig.json --outDir ${target}`)
    await folder(target).add('package.json')
    await folder(target).add('readme.md')
    await folder(target).add('license')
    await shell(`cd ${target} && npm pack`)
    
    // npm publish sinclair-typebox-0.x.x.tgz --access=public
}
