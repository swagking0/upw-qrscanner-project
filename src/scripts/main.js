import { Html5Qrcode } from "html5-qrcode"

const scanBtn = document.getElementById('scanqr');

const html5QrCode = new Html5Qrcode('reader');
var activeCamera;
const maxopenTime = 120;
var elapsedTime = 0;

function setActiveCamera() {
    Html5Qrcode.getCameras().then(devices => {
        if(devices && devices.length > 0) {
            activeCamera = devices[0].id != "" ? devices[0] : devices[1];
        }
    }).catch(err => {
        alert(err);
    });
}

if(!activeCamera){
    setActiveCamera();
}

scanBtn.addEventListener('click', () => {
    if(activeCamera != null) {
        html5QrCode.start(
            activeCamera.id,
            {
                fps: 10,
                qrbox: { width: 250, height: 250 }
            },
            (decodedText) => {
                if(decodedText != null && decodedText != "" && decodedText.includes('_')) {
                    let t = decodedText;

                    let thash = t.split('_')[0];
                    let tplat = t.split('_')[1];

                    elapsedTime = 0;
                } else {
                    html5QrCode.stop().then(() => {
                        window.location = window.location;
                        elapsedTime = 0;
                    }).catch(() => {
                        alert('failed to stop the scanning!');
                    });
                }
            },
            () => {
                elapsedTime += 1;
                if(elapsedTime === maxopenTime) {
                    html5QrCode.stop().then(() => {
                        window.location = window.location;
                        elapsedTime = 0;
                    }).catch(() => {
                        alert('failed to stop the scanning!');
                    });
                }
            }
        ).catch((err) => {
            alert(err);
        });
    } else {
        alert('failed to start scanning!');
    }
});