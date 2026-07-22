import './contacts.css'
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon from "./img/marker.svg";

function Contacts() {
    const customIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [22.5, 29.6],
    });

    return (
        <div className="contacts-wrap">
            <div className="contacts-header">
                <p>Games in Lviv</p>
                <h3>Contacts</h3>
            </div>
            <div className="contacts-main">
                <div className="contacts-component contacts--info">
                    <div>
                        <p className='contacts--info-title'>Address</p>
                        <p>
                            Lviv,<br />
                            3B Rynok Square
                        </p>
                    </div>
                    <div>
                        <p className='contacts--info-title'>Opening hours</p>
                        <p>Daily, 9:00 AM – 8:00 PM</p>
                    </div>
                    <div>
                        <p className='contacts--info-title'>Phone</p>
                        <a href="tel:+380505559955">+38 (050) 555-99-55</a>
                    </div>
                    <div>
                        <p className='contacts--info-title'>E-mail</p>
                        <a href="mailto:lviv.games@game.ua">lviv.games@game.ua</a>
                    </div>
                </div>
                <div className="contacts-component contacts--map">
                    <MapContainer center={[49.8424687,24.0300375]} zoom={15} style={{ width: "100%", height: "100%", borderRadius:"6px", }}>
                        <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                        <Marker position={[49.8424687,24.0300375]} icon={customIcon}>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    )
}

export default Contacts