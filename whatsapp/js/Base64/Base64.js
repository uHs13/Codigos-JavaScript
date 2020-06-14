export class Base64 {

    static getMimetype(base64) {

        let regex = /^data:(.+);base64,(.*)$/;

        let result = base64.match(regex);

        return result[1];

    }
    // .getMimeType

    static convertBase64inImage(base64, flip = true) {

        return new Promise((res, rej) => {

            let mimeType = Base64.getMimetype(base64);

            let ext = mimeType.split('/')[1];

            let fileName = `file${Date.now()}.${ext}`;

            if (flip) {

                Base64.flipXImage(base64).then(canvas => {

                    fetch(canvas.toDataURL(mimeType)).then(bytes => {
    
                        return bytes.arrayBuffer();
        
                    }).then(buffer => {
        
                        res(new File(
                            [buffer],
                            fileName,
                            {
                                type: mimeType
                            }
                        ));
        
                    });
    
                });

            } else {

                fetch(base64).then(bytes => {

                    return bytes.arrayBuffer();
    
                }).then(buffer => {
    
                    res(new File(
                        [buffer],
                        fileName,
                        {
                            type: mimeType
                        }
                    ));
    
                });

            }

        });

    }
    // .convertBase64inImage

    static flipXImage(base64) {

        return new Promise((res, rej) => {

            let picture = new Image();
        
            picture.src = base64;

            picture.onload = () => {

                let canvas = document.createElement('canvas');

                let context = canvas.getContext('2d');

                canvas.width = picture.width;
                canvas.height = picture.height;

                context.translate(picture.width, 0);
                context.scale(-1, 1);

                context.drawImage(picture, 0, 0, canvas.width, canvas.height);

                res(canvas);

            };

        });

    }
    // .flipXImage

}
// .Base64