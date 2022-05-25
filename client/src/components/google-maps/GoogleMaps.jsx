/* eslint-disable no-undef */

import React, { useEffect, useMemo, useState } from 'react'
import { Link } from "react-router-dom";
import './google-maps.scss';
import { ScriptLoaded, GoogleMap, useLoadScript, Marker, Autocomplete, InfoWindow, MarkerClusterer} from '@react-google-maps/api';
import PlacesAutocomplete, { geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import { getAllBeaches, swimLocation$, coords$, locationDetails$, getLocation, getBeachInfo } from '../../services/bad_havs_API';

const libraries = ['places']
const GoogleMaps = () => {
    const [map, setMap] = useState();
    const [geoLocation, setGeoLocation] = useState({});
    const [beaches, setBeaches] = useState([]);
    //Search states
    const [city, setCity] = useState('');
    //Is set but never read?
    const [coords, setCoords] = useState({lat: null, lng:null});
    //Object containing the details of the selected marker which is populated by the external beach API
    const [locationDetail, setLocationDetail] = useState({});

    //Active marker that user clicked on
    const [activeMarker, setActiveMarker] = useState(null)
    // Selected marker from click
    const [selected, setSelected] = useState(null);
    
    const center = useMemo(() => (geoLocation), [geoLocation]);
    
    useEffect(() => {
        getLocation();
        coords$.subscribe((res) => {
            console.log(res);
            setGeoLocation(res);
        })
        getAllBeaches();
        swimLocation$.subscribe(data => {
            let currentArr = beaches;
            setBeaches([data, ...currentArr]);
        })
        
    }, [])
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GMAPS_API_KEY,
        // googleMapsApiKey: "AIzaSyC01RQkQ0NYA_8B8eRbDLf8WfLOlubH-GA",
        libraries: libraries
      });

    /* async function getLocation() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(location => {
                const lat = location.coords.latitude;
                const long = location.coords.longitude;
                
                    setGeoLocation({
                    lat: lat,
                    lng: long
                })
            })
        }
    } */

     //Takes in the marker info as an object to pass the NUTSKOD to the getBeachInfo which calls the bad_havs_API to fetch info about clicked position. Stores result in locationDetails.
     const markerClickHandle = (marker) => {
        console.log(marker);

        getBeachInfo(marker.properties.NUTSKOD);

            locationDetails$.subscribe(data => {
                setLocationDetail(data);
            });
    }

    const handleSelect = async value => {
        const result = await geocodeByAddress(value);
        const latLng = await getLatLng(result[0]);
        setCoords(latLng);
        // console.log(coords);
        //Need to click the select dropdown for it to pan to hte location
        //Currently double action is neccessary to pan to the location, why?
        map.panTo(latLng);
    }

    const renderMap = () => {
        return(
            <>
            <div className="info-box">
                    <PlacesAutocomplete value={city} onChange={setCity} onSelect={handleSelect}>
                    {/* PlacesAutoComplete takes in a child props function to handle input values and displaying the suggestion results */}
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                    <div>
                        {/* <p>Latitude: {coords.lat}</p>
                        <p>Longitude: {coords.lng}</p> */}
                        <input className="search" {...getInputProps({ placeholder: "Search city", type: "text"})} />

                        <div className='suggestions'>
                            {loading ? <div>loading...</div> : null}
                            {suggestions.map((suggestion, i) => {
                                const style = {
                                    backgroundColor: suggestion.active ? "#7ddbd7" : "#fff"
                                }
                                //Looks for the suggestions and applies the background style depending on if it's active or not(mouse hover or keyboard select)
                                return <div key={i} {...getSuggestionItemProps(suggestion, { style })}>
                                   {suggestion.description}</div>
                            })}
                        </div>
                    </div>
                    
                    
                    )}

                    </PlacesAutocomplete>
                    {/* Functionality of this button will be found in the the quick access bar */}
                    {/* <button onClick={() => map.panTo(center)}>My position</button> */}
                </div>
                <GoogleMap
                center={center}
                zoom={8}
                mapContainerClassName="map-container"
                onLoad={(map) => setMap(map)}
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false
                }}
                
                >
                    {beaches[0].length > 1 &&
                       
                       <MarkerClusterer
                       // imagePath={'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'}
                       onLoad={() => {
                           console.log('Clusterer loaded');
                       }}
                       onClick={(e) => {
                           console.log(e);
                       }}
                       >
                           {(clusterer) => 
                           
                               beaches[0]?.map((marker, index) => (
                                   <Marker
                                   visible={true}
                                   key={index}
                                   // icon={require("../../assets/images/swim-blue.png")}
                                   icon={index % 2 === 0 ? require("../../assets/images/google-maps/swim-orange.png") : require("../../assets/images/google-maps/swim-blue.png")}
                                   
                                   clusterer={clusterer}
                                   position={{lat: marker.geometry.coordinates[1], lng: marker.geometry.coordinates[0]}}
                                   onClick={(mark, e) => {
                                       markerClickHandle(marker);
                                       setActiveMarker(mark);
                                       setSelected(marker);
                                   }}
                                   >
                                   </Marker>
                               ))

                           
                           }
                       </MarkerClusterer>
                   }

                    {selected ? (
                        <InfoWindow
                        // eslint-disable-next-line no-undef
                        options={{ pixelOffset: new window.google.maps.Size(0, -40) }}
                        position={activeMarker.latLng.toJSON()}
                        onClick={(e) => {
                            // console.log(e.target);
                        }}
                        onCloseClick={()=> {
                            setSelected(null)
                        }}
                        >
                            <>
                            <p className='map-info-header'>{locationDetail.locationName}</p>
                            <p className='map-info-sub'>{locationDetail.locationArea}</p>
                            <Link className='info-link' to={`/location/${locationDetail.nutsCode}`}>More details</Link>
                            </>
                        </InfoWindow>
                    ): null}

                </GoogleMap>
            </>
        )
    }

    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>
      }
    
      return isLoaded ? renderMap() : "Couldn't render map";
}

export default GoogleMaps;