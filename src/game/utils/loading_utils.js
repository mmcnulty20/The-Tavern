const loader = (sources, images, callback) => {
    Object.keys(sources).forEach( name => {
        if ( !images[name] ) {
            let image = new Image();
            image.src = sources[name];
            image.onload = () => {
                images[name] = image
                callback(name, image)
            }
        } else {
            console.log("preloaded")
            callback(name, images[name]);
        }
    })
    return true
}

export let imagesStore = {}

export const loadImages = ( sources, callback, images = imagesStore) => {
    loader(sources, images, callback);
    return images
}

// export const loadImages = (sources, callback) => {
//     sources = { ...sources }
//     console.log(sources)
//     const promises = []
//     Object.keys(sources).forEach( (name) => {
//         imagesStore[name] ? null : promises.push(onePromise(name, sources[name]))
//     } )
//     console.log("in loadImages")
//     console.log(promises)
//     Promise.all(promises).then( () => {
//         console.log("success")
//         console.log(imagesStore)
//         Object.keys(imagesStore).forEach( key => {
//             callback(key, imagesStore[key])
//         });
//     } )

// }

// const resolveCB = (img, name) => {
//     imagesStore[name] = image;
//     console.log("--------")
//     console.log(name)
//     console.log(img)
//     console.log("--------")
// }

// const rejectCB = () => {
//     console.log("load error")
// }

// const onePromise = (name, src) => {
//     console.log("in promise gen")
//     return new Promise( (resolve, reject) => {
//         let img = new Image();
//         img.src = src;
//         img.onload = () => resolve(img,name)
//         img.onerror = () => reject();
//     })
// }