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