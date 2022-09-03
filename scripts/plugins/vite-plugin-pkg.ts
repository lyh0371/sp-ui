// 在全量打包的时候生成package.json

function createPkg() {
  return {
    name: 'createPkg',
    generateBundle(config, bundle: any) {
      for (const key in bundle) {
        if (key === 'index.js') {
          bundle[key].code = `${bundle[key].code}require("./style.css")`
        }
        if (key === 'index.mjs') {
          bundle[key].code = `${bundle[key].code}import "./style.css"`
        }
      }
    }
  }
}

export default createPkg
