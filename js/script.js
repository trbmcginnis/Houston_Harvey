//https://esri.github.io/esri-leaflet/examples/simplifying-complex-features.html
//points of interest: spring and aldine northwest
//Kingwood, Cypress North


$(function() {
    
    var lat = 29.76;
    var lng = -95.37;
    var mapzoom = 8;

    var map = L.map('map', {
        zoomControl: true
    });

    map.setView([lat, lng], mapzoom);
/*
       map.createPane('DepthPane');
        map.createPane('BuildingsPane');
        map.createPane('Land_Use_Pane');
        map.createPane('Pop_Growth_Pane')

    map.getPane('BuildingsPane').style.zIndex = 398;
    map.getPane('DepthPane').style.zIndex = 396;
    map.getPane('Land_Use_Pane').style.zIndex = 394;
    map.getPane('Pop_Growth_Pane').style.zIndex = 392;*/

   


    // set basemap as Carto tile Layer
    var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
    attribution: 'Map Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors, Map Tiles &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    });

    // add these tiles to the map
    map.addLayer(CartoDBTiles);

    //Add a geocoder for users to search location
    //L.Control.geocoder().addTo(map);

    //Add map scale
    L.control.scale().addTo(map);

    $(function () {
    $("#btnDis").click(function () {

        var map = L.map('map').setView([51.49521, -0.10062], 9);
        L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
        }).addTo(map);
    });
});


/*map.on('click', function(e) {
    alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
});*/

var HomeControl =  L.Control.extend({

  options: {
    position: 'topleft'
  },

  onAdd: function (map) {
    var homecontainer = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

    homecontainer.type = "button";
    homecontainer.style.backgroundColor = 'white';    
    homecontainer.style.backgroundImage = "url(https://image.flaticon.com/icons/svg/23/23665.svg)";
    homecontainer.style.backgroundSize = "40px 40px";
    homecontainer.style.width = '40px';
    homecontainer.style.height = '40px';

    homecontainer.onclick = function(){
      map.setView([lat, lng], mapzoom);
    }

    return homecontainer;
  }
});

map.addControl(new HomeControl());

$(document).ready(function(){
    $("#Get_Started").click(function(){
        map.setZoom(9);
        console.log("hiiiiiii");
    });
});

$(document).ready(function(){
    $("#Cypress").click(function(){
        map.setView([29.99627304975277, -95.6850814819336], 12);
        console.log("heyyyyy");
    });
});



var PopControl =  L.Control.extend({

  options: {
    position: 'topleft'
  },

  onAdd: function (map) {
    var Popcontainer = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

    Popcontainer.style.backgroundColor = 'white';     
    Popcontainer.style.backgroundImage = "url(https://image.freepik.com/free-icon/multiple-users-silhouette_318-49546.jpg)";
    Popcontainer.style.backgroundSize = "30px 30px";
    Popcontainer.style.width = '30px';
    Popcontainer.style.height = '30px';

    Popcontainer.onclick = function(){
        map.setZoom(15);
        console.log("Button is finally working");
    }

    return Popcontainer;
  }
});

map.addControl(new PopControl());




/*$( "#PopBtn" ).on( "click", function() {
  console.log( $( this ).text(hey) );
});*/

/*
$(document).ready(function(){
    $('#PopBtn').click(function(){
        console.log("The Button is working!!!");
    });
});*/

/*$( "#PopBtn" ).click(function() {
  alert( "Handler for .click() called." );
  });

/*
function setUpListeners() {
        $('#PopBtn').click(function(){
            //var newzoom = 16
            //map.setZoom(newzoom);
            console.log("buton is finally working");
        });

}*/

/*
$(document).ready( function () {
    //Search the parent class, id, or tag and then try to find the <a id="addMore"></a>  as a child
    /*$('.parent #addMore').on('click', function () {
        alert('addMore click event');
    });*/
    //Try too with the specific tag
    /*$('#PopBtn').on('click', function () {
        alert('Pop click event');
        console.log("Button is finally working");
    });
    //And try too with the specific tag
    /*$('a #addMore').on('click', function () {
        alert('addMore click event');
    });*/

//});

/*
L.easyButton('#PopBtn'), function(btn, map){
    var npopzoom = 16
    map.setView(npopzom);
}).addTo(map);*/

 // zoom in function
        /*$('#PopBtn').click(function(){
          map.setZoom(16);
          console.log("BUTTON IS WORKING");
        });*/
/*
var POP_Button_Works = function setUpListeners() {
        $('#PopBtn').click(function(){
            var newzoom = 16
            map.setZoom(newzoom);
            console.log("buton is finally working");
        });

        return POP_Button_Works;


    

        //$('#FloodBtn').click(function(){
           // map.setzoom(16);
            //});
        //});


}



/*var popup = L.popup();
function DepthPopup(e) {
  var layer = e.target;

  popup
    .setContent("Coordinates Beep")
  .openOn(map);


//function to bind a Popup to each polygon using L.Util.template from Leaflet
/*InDepth.bindPopup(function (layer) {
    return L.Util.template('<p><strong>Neighborhood:</strong> {KCTA_NAME_}<br><strong> Average Inundation Depth (ft): </strong>{Avg_IN_DEP}<br> <strong> Number of Households Affected:</strong> {Count_}</p>', layer.feature.properties);
  });*/

var InDepthGeoJSON;
var InDepthReplacementGeoJSON;


function DepthgetColor(d) {
    return d >= 8  ? '#003366' :
           d >= 6  ? '#0059b3' :
           d >= 4  ? '#0073e6' :
           d >= 2  ? '#3399ff' :
                    '#b3d9ff' ;
          
}

        function Depthstyle(feature) {
            return {
                fillColor: DepthgetColor(feature.properties.Avg_IN_DEP),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        }





    // let's add neighborhood data
$.getJSON( "https://trbmcginnis.github.io/Harvey_Geojson/Geojson_Final_Inund.geojson", function( data ) {
    // ensure jQuery has pulled all data out of the geojson file
    var InDepth = data;

    


    /*console.log(InDepth);*/

    // neighborhood choropleth map
    // let's use % in poverty to color the neighborhood map
    /*var InDepthStyle = function (feature){
        var value = feature.properties.Avg_IN_DEP;
        var fillColor = null;
        if(value >= 0 && value <=2){
            fillColor = "#900C3F";
        }
        if(value >2 && value <=4){
            fillColor = "#900C3F";
        }
        if(value >4 && value<=6){
            fillColor = "#900C3F";
        }
        if(value > 6 && value <=8){
            fillColor = "#FF5733";
        }
        if(value > 8) { 
            fillColor = "#FF5733";
        }   
     

        var style = {
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
            fillColor: DepthgetColor,
        };

        return style;
    }  


       /*console.log(fillColor);*/
 /*
function Depthstyle(feature) {
    return {
        fillColor: DepthgetColor(feature.properties.Avg_IN_DEP),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
    };
}

    /*InDepthGeoJSON = L.geoJson(InDepth, {
        style: InDepthStyle,
    }).addTo(map);

});*/





    function DepthhighlightFeature(e) {
    var layer = e.target;

    //layer.bindPopup("Popup content");

    layer.setStyle({
        weight: 5,
        color: '#FFD700',
        dashArray: '',
        fillOpacity: 0.7

    });

    /*if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
        
    }*/
    info.update(layer.feature.properties);

}

function DepthresetHighlight(e) {
    InDepthGeoJSON.resetStyle(e.target);
    info.update();
}

function DepthzoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
    /*var layer= InDepthGeoJSON

    layer.setStyle({
        fillColor: null,
        weight: 5,
        color:'black',
        dashArray: '3',
        fillOpacity: 0,
    });*/
}



/*var popup = L.popup();
function DepthPopup(e) {
  var layer = e.target;

  popup
    .setContent("Coordinates Beep")
  .openOn(map);
};*/


/*var blayer=e.target;
layer.bindPopup("Popup content");
        layer.on('mouseover', function (e) {
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            this.closePopup();
        });*/

/*var DepthPopup = function (feature, layer) {
        // let's bind some feature properties to a pop up
        layer.bindPopup("<p><strong>BEEEP:</strong> {KCTA_NAME_}<br><strong> Average Inundation Depth (ft): </strong>{Avg_IN_DEP}<br> <strong> Number of Households Affected:</strong> {Count_}</p>");
    }*/


function DepthonEachFeature(feature, layer) {
    layer.on({
        mouseover: DepthhighlightFeature,
        mouseout: DepthresetHighlight,
        click: DepthzoomToFeature,
        //pane: DepthPane,
    });
}

    

    InDepthGeoJSON = L.geoJson(InDepth, {
        style: Depthstyle,
        onEachFeature: DepthonEachFeature,
    }).addTo(map);
});


map.on('zoomend', function() {
    if (map.getZoom() >= 15) {
        map.removeLayer(InDepthGeoJSON);
    } else {
        console.log("Original Layer Active");
        map.addLayer(InDepthGeoJSON);
    } 

});


var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Flood Depth by Neighborhood</h4>' + (props ?
        '<b>' + props.Avg_IN_DEP.toFixed(2) + 'ft </b><br />' + props.KCTA_NAME_
        : 'Hover over Neighborhood');
};

//info.addTo(map);

map.on('zoomend', function() {
    if (map.getZoom() >= 15) {
        console.log("DEPTH popup control REMOVED")
        map.removeControl(info);
    } else {
        console.log("DEPTH Popup control ADDED");
        map.addControl(info);
    } 

});


var DepthLegend = L.control({position: 'bottomright'});

/*
DepthLegend.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info legend');
    amounts = [0, 2, 4, 6, 8]

    div.innerHTML +=
    '<p><strong>Inundation Depth (ft)</strong></p>';

    for (var i = 0; i < amounts.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + DepthgetColor(amounts[i] + 1) + '"></i> ' +
                        amounts[i] + (amounts[i + 1] ? '&ndash;' + amounts[i + 1] + '<br />' : '+<br />');
                }

return div;
};*/

//DepthLegend.addTo(map);

//create legend for Land based on categories
DepthLegend.onAdd = function (map) {
    //doing all of this stuff inside our onAdd function when we add it to the map

    var div = L.DomUtil.create('div', 'info legend');   //using a function in leaflet called DomUtil--will create a dom element for you over the top of a leaflet map, you can position it wherever you like
        //class of info and legend
        div.innerHTML +=        //everything we put inside will go inside our div
                                //manually created all these components of the legend 
            '<b><font size =-2>Flood Depth (ft)</font></b><br />' +
            '<svg class="left" width="22" height="18"><rect rx="0" ry="0" height="10" width="10" class="legend0"/></svg><span>0-2</span><br />' +
            '<svg class="left" width="22" height="18"><rect rx="0" ry="0" height="10" width="10" class="legend2"/></svg><span>2-4</span><br />' +
            '<svg class="left" width="22" height="18"><rect rx="0" ry="0" height="10" width="10" class="legend4"/></svg><span>4-6</span><br />' +
            '<svg class="left" width="22" height="18"><rect rx="0" ry="0" height="10" width="10" class="legend6"/></svg><span>6-8</span><br />' +
            '<svg class="left" width="22" height="18"><rect rx="0" ry="0" height="10" width="10" class="legend8"/></svg><span>8+</span><br />';


    return div;
};

map.on('zoomend', function() {
    if (map.getZoom() >= 15) {
        console.log("DEPTH popup control REMOVED")
        map.removeControl(DepthLegend);
    } else {
        console.log("DEPTH Popup control ADDED");
        map.addControl(DepthLegend);
    } 

});





/*function DepthgetColor2(d) {
return d >= 8  ? '#800026' :
        d >= 6  ? '#BD0026' :
        d >= 4  ? '#E31A1C' :
        d >= 2  ? '#FC4E2A' :
                '#FD8D3C' ;
          
}

        function Depthstyle2(feature) {
            return {
                fillColor: DepthgetColor(feature.properties.Avg_IN_DEP),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        }*/












$.getJSON( "https://trbmcginnis.github.io/Harvey_Geojson/Geojson_Final_Inund.geojson", function( data ) {
    // ensure jQuery has pulled all data out of the geojson file
    var DepthReplacement = data;

        function Replacementstyle(feature) {
            return {
                fillColor: null,
                weight: 2,
                opacity: 1,
                color: 'black',
                dashArray: '3',
                fillOpacity: 0,
            };
        }

    InDepthReplacementGeoJSON = L.geoJson(DepthReplacement, {
        style: Replacementstyle,
        //pane: DepthPane,
        //onEachFeature: ReplacementonEachFeature,
    }).addTo(map);

});

map.on('zoomend', function() {
    if (map.getZoom() < 15) {
        map.removeLayer(InDepthReplacementGeoJSON);
    } else {
        console.log("Replacement Layer Active");
        map.addLayer(InDepthReplacementGeoJSON);
    } 

});




/*
var myIcon = L.icon({
  iconUrl: myURL + 'images/pin24.png',
  iconRetinaUrl: myURL + 'images/pin48.png',
  iconSize: [29, 24],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});*/


 
//Select Buildings point layer from ArcGIS API
var Buildings = L.esri.Cluster.featureLayer({
  url: 'https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/FEMA_Damage_Assessments_Harvey_20170829/FeatureServer/0', 
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, { //create circle markers from the point locations
        fillColor: '#b30000',
        color: 'black',
        fillOpacity: 1,
        radius: 2,
        weight: .3
               
        })
    }
})

//function to add or remove layer based on zoom level
map.on('zoomend', function() {
    if (map.getZoom() < 9) {
        map.removeLayer(Buildings);
    } else {
        console.log("Point Layer Active");
        map.addLayer(Buildings);
    } 

});

/*var markers = new L.MarkerClusterGroup();

markers.addLayer(L.circleMarker([175.3107, -37.7784]));
// add more markers here...

map.addLayer(markers);*/










//Select polygon layer for Land Use Changes from ArcGIS API
var Land_Use_Changes = L.esri.featureLayer({
    url: 'https://gis.h-gac.com/arcgis/rest/services/Land_Use/Announced_Changes/MapServer/0', 
    style: function (feature) {
        return {
        fillColor: getColorLand(feature.properties.Label_Current_Land_Use, feature.properties.Label_Announced_Changes),
        fillOpacity: .8,
        weight: .5,
        color: 'white',
        //pane: Land_Use_Pane
        }
    }
})

//function to add or remove layer based on zoom level
map.on('zoomend', function(){
    if (map.getZoom() < 15) {
        map.removeLayer(Land_Use_Changes);
    } else {
        console.log("Polygon Layer Active");
        map.addLayer(Land_Use_Changes);
    }
}); 



//function to style the polygon based on categories
function getColorLand(l, a) {
    return l ===  'Residential' && a === 'Residential' ? '#ff9900' :
            l === 'Vacant Developable (includes Farming)' && a === 'Residential' ? '#660066' :
            l === 'Vacant Developable (includes Farming)' && a === 'Commercial' ? '#e6e600' :
            l === 'Vacant Developable (includes Farming)' && a === 'Industrial' ? '#e6e600' :
            l === 'Vacant Developable (includes Farming)' && a === 'Multiple' ? '#e6e600' :
            l === 'Commercial' && a === 'Residential' ? '#ff3377' :
            l === 'Industrial' && a === 'Residential' ? '#ff3377' :
            l === 'Other' && a === 'Residential' ? '#ff3377' :
                    '#4d3300'; 
    }

//Function to bind Popup to each polygon 
Land_Use_Changes.bindPopup(function (layer) {
    return L.Util.template('<p><strong>Current Land Use:</strong> {Label_Current_Land_Use}<br> <strong>Announced Land Use Changes:</strong> {Label_Announced_Changes}<br> <strong>Current Number of Housing Units:</strong> {Housing_Units_Current}<br> <strong>Number of Housing Units by 2045:</strong> {Housing_Units_2045}</p>', layer.feature.properties);
  }); 


//Select polygon Layer of population growth 2012-2017 by block group from ArcGIS API
var Pop_Growth = L.esri.featureLayer({
    url: 'http://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Projected_Population_Change/MapServer/1',
    style: function (feature) {
        return {
        fillColor: null,//getColorPop(feature.properties.POPGRWCYFY),
        weight: 1,
        color: 'purple',
        fillOpacity: 0,
        //pane: Pop_Growth_Pane
    }
}
})

//function to add or remove layer depending on zoom level
map.on('zoomend', function(){
    var z = map.getZoom();
    if (z < 15) {
        map.removeLayer(Pop_Growth);
    } else {
        map.addLayer(Pop_Growth);
    }
});

  /*map.on("layremove", function (event) {
  Pop_Growth.bringToBack();
});*/

//function to style each polygon based on value--choropleth map
/*function getColorPop(p) {
    return p <= 0 ? '#ffffb3' :
            p <= .3 ? '#ffff66' :
            p <= 1.2 ? '#cccc00' :
            p <= 2.5 ? '#808000' :
                    '#333300' ;
    }*/

//function to bind popup to polygon
/*Pop_Growth.bindPopup(function (layer) {
      layer.bindPopup("hello");
        layer.on('mouseover', function (e) {
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            this.closePopup();
        });
    return L.Util.template('<p><strong>Pop. Growth 2000-2010:</strong> {POPGRW0010} %<br> <strong>Pop. Growth 2010-2012:</strong> {POPGRW10CY} %<br> <strong>Pop. Growth 2012-2017:</strong> {POPGRWCYFY} %</p> ', layer.feature.properties);
  });*/




var oldId;

  Pop_Growth.on('mouseout', function(e){
    document.getElementById('info-pane').innerHTML = 'Hover over Block Group';
    Pop_Growth.resetFeatureStyle(oldId);
  });

  Pop_Growth.on('mouseover', function(e){
    oldId = e.layer.feature.id;
    document.getElementById('info-pane').innerHTML = '<strong>Pop. Growth 2000-2010:</strong>' + e.layer.feature.properties.POPGRW0010 + '% <br> <strong>Pop. Growth 2010-2012:</strong>' + e.layer.feature.properties.POPGRW10CY + '% <br><strong>Pop. Growth 2012-2017:</strong>' + e.layer.feature.properties.POPGRWCYFY + '%';
    Pop_Growth.setFeatureStyle(e.layer.feature.id, {
      color: 'orange',
      weight: 3,
      opacity: 1
    });
  });


/*
 var oldId;

  Pop_Growth.on('mouseout', function(e){
    document.getElementById('info-pane').innerHTML = 'Hover over Block Group';
    Pop_Growth.resetFeatureStyle(oldId);
  });

  Pop_Growth.on('mouseover', function(e){
    oldId = e.layer.feature.id;
    document.getElementById('info-pane').innerHTML = '<strong>Pop. Growth 2000-2010:</strong>' + e.layer.feature.properties.POPGRW0010 + '<br> <strong>Pop. Growth 2010-2012:</strong>' + e.layer.feature.properties.POPGRW10CY + '<br><strong>Pop. Growth 2012-2017:</strong>' + e.layer.feature.properties.POPGRWCYFY;
    Pop_Growth.setFeatureStyle(e.layer.feature.id, {
      color: 'orange',
      weight: 3,
      opacity: 1
    });
  });*/

  /*map.on('zoomend', function() {
    if (map.getZoom() < 15) {
        console.log("Population Popup removed")
        map.removeLayer(oldId);
    } else {
        console.log("Population Popup Added");
        map.addLayer(oldId);
    } 

});

/*var infoPop = L.control();

infoPop.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
infoPop.update = function (props) {
    this._div.innerHTML =  '<h5>Pop. Change by Block Group</h5>' + (props ? '<strong>Pop. Growth 2000-2010:</strong>' + 
        props.POPGRW0010 + '<br>Pop. Growth 2010-2012' + props.POPGRW10CY + '<br>Pop. Growth 2012-2017' + props.POPGRWCYFY
        : 'Hover over a Block Group');
};

infoPop.addTo(map);*/


/*
  map.on("layeradd", function (event) {
  Buildings.bringToFront();
});

  map.on("layeradd", function (event) {
  Land_Use_Changes.bringToFront();
});*/


/*
//create layer controls so that viewer can toggle the layers on and off
function createLayerControls(){
    // basemap--permanent
    var baseMaps = {
        "CartoDB Basemap": CartoDBTiles,
    };

    //overlap maps add to Layer control
    var overlayMaps = {
        "Damaged Buildings": Buildings,
        "Land": Land_Use_Changes,
        "Population": Pop_Growth,
        "Depth": InDepthGeoJSON
    };

    // add control
    L.control.layers(baseMaps, overlayMaps).addTo(map);
    
}

createLayerControls()*/

//define the variables for each legend
//var DepthLegend = L.control({position: 'bottomright'});
//var PopulationLegend = L.control({position: 'bottomright'});
var LandLegend = L.control({position: 'bottomright'});
//var BuildingsLegend = L.control({position: 'bottomleft'});

//create legend for Inundation Depth based on values
/*DepthLegend.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info legend');
    amounts = [0, 2, 4, 6, 8]

    div.innerHTML +=
    '<p><strong>Flood Depth (ft)</strong></p>';

    for (var i = 0; i < amounts.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + DepthgetColor2(amounts[i] + 1) + '"></i> ' +
                        amounts[i] + (amounts[i + 1] ? '&ndash;' + amounts[i + 1] + '<br>' : '+');
                }

return div;
};

//DepthLegend.addTo(map);

map.on('zoomend', function() {
    if (map.getZoom() >= 15) {
        console.log("DEPTH popup control REMOVED")
        map.removeControl(DepthLegend);
    } else {
        console.log("DEPTH Popup control ADDED");
        map.addControl(DepthLegend);
    } 

});*/

/*
map.on('zoomend', function() {
    if (map.getZoom() >= 15) {
        map.removeLayer(InDepthGeoJSON);
    } else {
        console.log("Original Layer Active");
        map.addLayer(InDepthGeoJSON);
    } 

});

/*
//create legend for Population based on values
PopulationLegend.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info legend');
    amounts = [-5, 0, .3, 1.2, 2.5]

    div.innerHTML += '<p><strong>Population Growth 2012-2017 (%)</strong></p>';

    for (var i = 0; i < amounts.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColorPop(amounts[i] + 1) + '"></i> ' +
                    amounts[i] + (amounts[i + 1] ? '&ndash;' + amounts[i + 1] + '<br />' : '+<br />');
            }

return div;
};*/



//create legend for Land based on categories
LandLegend.onAdd = function (map) {
    //doing all of this stuff inside our onAdd function when we add it to the map

    var div = L.DomUtil.create('div', 'info legend');   //using a function in leaflet called DomUtil--will create a dom element for you over the top of a leaflet map, you can position it wherever you like
        //class of info and legend
        div.innerHTML +=        //everything we put inside will go inside our div
                                //manually created all these components of the legend 
            '<b><font size =-2>Land Use Changes Proposed by 2045</font></b><br />' +
            '<svg class="left" width="22" height="18"><rect rx="0" ry="0" height="10" width="10" class="legendSvgRes"/></svg><span><font size = -2>Growing Residential</font></span><br />' +
            '<svg class="left" width="22" height="18"><rect rx="0" ry="0" height="10" width="10" class="legendSvgVtoRes"/></svg><span><font size = -2>Residential Built on Undeveloped Land</font></span><br />' +
            '<svg class="left" width="22" height="18"><rect rx="0" ry="0" height="10" width="10" class="legendSvgVtoCom"/></svg><span><font size = -2>Commercial/Industrial/Other Built on Undeveloped Land</font></span><br />' +
            '<svg class="left" width="22" height="18"><rect rx="0" ry="0" height="10" width="10" class="legendSvgComToRes"/></svg><span><font size = -2>Commercial/Industrial/Other to Residential</font></span><br />' +
            '<svg class="left" width="22" height="18"><rect rx="0" ry="0" height="10" width="10" class="legendSvgOther"/></svg><span><font size = -2>Other</font></span><br />';


    return div;
};

//LandLegend.addTo(map);

map.on('zoomend', function(){
    if (map.getZoom() < 15) {
        map.removeControl(LandLegend);
    } else {
        console.log("Polygon Layer Active");
        map.addControl(LandLegend);
    }
}); 



// Add Depth legend only right now, as it is the "default", other layers will show up as user zooms in
//DepthLegend.addTo(map);
//currentLegend = DepthLegend;

//function to add or remove legends when layer controls automatically toggle on and off due to zoom level (this process was already set earlier)
/*map.on('overlayadd', function (eventLayer) {
    if (eventLayer.name === 'Depth') {
        map.removeControl(currentLegend );
        currentLegend = DepthLegend;
        DepthLegend.addTo(map);
    }
    else if  (eventLayer.name === 'Population') {
        map.removeControl(currentLegend );
        currentLegend = PopulationLegend;
        PopulationLegend.addTo(map);
    }
    else if  (eventLayer.name === 'Land') {
       map.removeControl(currentLegend );
        currentLegend = LandLegend;
        LandLegend.addTo(map);
    }
  })*/



/*
//add damage assessment legend which is always showing on the page
BuildingsLegend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');   //will create a dom element for you over the top of a leaflet map, you can position it wherever you like
        //class of info and legend
        div.innerHTML +=        //everything we put inside will go inside our div
                                //manually created all these components of the legend 
            '<b>FEMA Damage Assessment</b><br />' +
            '<svg class="left" width="22" height="18"><circle cx="10" cy="9" r="5" class="legendSvgBuildings"/></svg><span>Damaged Buildings</span><br />';

    return div;
};

BuildingsLegend.addTo(map);


/*$(document).ready( function () {
    //Search the parent class, id, or tag and then try to find the <a id="addMore"></a>  as a child
    /*$('.parent #addMore').on('click', function () {
        alert('addMore click event');
    });*/
    //Try too with the specific tag
    /*$('#PopBtn').on('click', function () {
        //alert('Pop click event');
        map.setZoom(15);
        console.log("Button is finally working");
    });
    //And try too with the specific tag
    /*$('a #addMore').on('click', function () {
        alert('addMore click event');
    });*/

/*});
/*
L.easyButton('#PopBtn'), function(btn, map){
    var npopzoom = 16
    map.setView(npopzom);
}).addTo(map);*/

 // zoom in function
        /*$('#PopBtn').click(function(){
          map.setZoom(16);
          console.log("BUTTON IS WORKING");
        });*/

/*
    function setUpListeners() {
        $('#PopBtn').click(function(){
            var newzoom = 16
            map.setZoom(newzoom);
        });

        return newzoom;
    

        //$('#FloodBtn').click(function(){
           // map.setzoom(16);
            //});
        //});


}*/



});