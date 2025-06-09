document.addEventListener("DOMContentLoaded", function () {
    var map = L.map('map').setView([51.1657, 10.4515], 6); // Deutschland als Startpunkt
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    db.collection("waste_spots").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            L.marker([data.lat, data.lng]).addTo(map)
                .bindPopup(`
                    <strong>${data.wasteType}</strong><br>
                    ${data.wasteCondition}<br>
                    Gemeldet am: ${data.reportDate}<br>
                    <img src="${data.imageUrl}" width="100"><br>
                    <button onclick="deleteSpot('${doc.id}')">Löschen</button>
                `);
        });
    });

    document.getElementById("reportForm").addEventListener("submit", function (event) {
        event.preventDefault();
        let wasteType = document.getElementById("wasteType").value;
        let wasteCondition = document.getElementById("wasteCondition").value;
        let imageFile = document.getElementById("imageUpload").files[0];
        let lat = map.getCenter().lat;
        let lng = map.getCenter().lng;
        let reportDate = new Date().toISOString().split("T")[0];

        var storageRef = storage.ref(`waste_images/${imageFile.name}`);
        storageRef.put(imageFile).then((snapshot) => {
            snapshot.ref.getDownloadURL().then((url) => {
                db.collection("waste_spots").add({
                    lat: lat,
                    lng: lng,
                    wasteType: wasteType,
                    wasteCondition: wasteCondition,
                    reportDate: reportDate,
                    imageUrl: url,
                    userId: auth.currentUser.uid
                }).then(() => {
                    location.reload();
                });
            });
        });
    });
});

function deleteSpot(spotId) {
    let user = auth.currentUser;
    if (user) {
        db.collection("waste_spots").doc(spotId).get().then((doc) => {
            if (doc.exists && doc.data().userId === user.uid) {
                db.collection("waste_spots").doc(spotId).delete().then(() => {
                    alert("Müll-Hotspot gelöscht!");
                    location.reload();
                });
            } else {
                alert("Du kannst nur deine eigenen Spots löschen.");
            }
        });
    } else {
        alert("Bitte einloggen!");
    }
}
