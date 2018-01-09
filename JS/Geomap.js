
            var tempByCountry;

            var Jan2012;
            var Jan1912;
            var Jan2013;
            var Aug1912;
            var Aug2013;
            var paletteScale;
            var dataset = {};
            var set=0;
            var highestValue;


            var paletteScale = d3.scale.linear()
                    .domain([30,22,14,6,-2,-10,-18,-28])
                    .range(['#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#e6f598', '#abdda4', '#66c2a5', '#3288bd']);
           

            var map = new Datamap({element: document.getElementById('map'),
                geographyConfig: {
                    popupTemplate: function(geography, data) {
                        return '<div class="hoverinfo"><b>' + geography.properties.name + '</b></br>' + 'Temperature:' +  data.temp + '</b></br> Date: '+ data.month+'</div>'
                    }

                },
                fills: {
                    defaultFill: '#efe5de' 
                },
                projection: 'mercator'
            });

            d3.csv("Jan2012.csv", function(data) {
                tempByCountry = data;
            });

            d3.csv("Jan2012.csv", function(data) {
                Jan2012 = data;
            });

            d3.csv("Aug2013.csv", function(data) {
                Aug2013 = data;
            });
             d3.csv("Aug1912.csv", function(data) {
                Aug1912 = data;
            });

            
            d3.csv("country-codes2.csv", function(data) {
                countryCodes = data;
            });

            d3.csv("Jan2013.csv", function(data) {
                Jan2013 = data;
            });

            d3.csv("Jan1912.csv", function(data) {
                Jan1912 = data;
            });

            var loadInterval = setInterval(setCountryCodes, 1000);

            function setCountryCodes(){
                console.log('Loading...');
                console.log(tempByCountry);
            

                if (tempByCountry !== undefined && countryCodes !== undefined){
                    for(country in tempByCountry){
                        
                        var oldCountryCode = tempByCountry[country]['Country'];

                        var newCountryCode = '';
                       
                        for(code in countryCodes){
                            
                            if (countryCodes[code]['official_name_en'] == oldCountryCode){
                                newCountryCode = countryCodes[code]['ISO3166-1-Alpha-3'];
                                
                            }
                        }
                        tempByCountry[country]['Country3'] = newCountryCode;
                        
                    }
                    console.log('Done!');
                    setColours(-28,30);
                    clearInterval(loadInterval);
                    
                }

            }
            function setColours(min, max){
                highestValue=0;
                var paletteScale = d3.scale.linear()
                    .domain([30,22,14,6,-2,-10,-18,-28])
                    .range(['#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#e6f598', '#abdda4', '#66c2a5', '#3288bd']);
           
                    console.log('Did a thing');
                updateMap(paletteScale,tempByCountry);

            }

           
            function updateMap(palette,data){
                
                for(country in data){
                    var iso = data[country]['Country3'],
                        value = data[country].AverageTemperature;
                        
                        newValue = value;
                        if(newValue > highestValue)
                        {
                            highestValue = newValue;
                        }

                        date = data[country].dt;
                        
                    dataset[iso] = { temp: value, fillColor: palette(value), month: date };
                
                
                }
                console.log(dataset);
                
                map.updateChoropleth(dataset);
            }
             
                d3.select(".buttons").append("button")
                .text("Januari")
                .on("click",function(){
                     dataset = {};
                     tempByCountry = {};
                    if(set == 0)
                    {
                       
                        tempByCountry = Jan1912;

                        console.log(tempByCountry);
                        setCountryCodes();
                        map.updateChoropleth(null, {reset: true})
                    
                        set = 1;
                        d3.select(".h2header").text("Januari 1912");
                    }
                    else
                    {
                      
                        tempByCountry = Jan2012;

                        console.log(tempByCountry);
                        setCountryCodes();
                        map.updateChoropleth(null, {reset: true})
                        
                        set = 0;
                        d3.select(".h2header").text("Januari 2012");
                    }
                    updateMap(paletteScale,tempByCountry); 
                });

                d3.select(".buttons").append("button")
                .text("Augustus")
                .on("click",function(){
                    if(set == 0)
                    {
                        dataset = {};
                        tempByCountry = {};
                        tempByCountry = Aug1912;

                        console.log(tempByCountry);
                        setCountryCodes();
                        map.updateChoropleth(null, {reset: true})
                        updateMap(paletteScale,Aug1912);
                        set = 1;
                         d3.select(".h2header").text("Augustus 1912");
                    }
                    else
                    {
                        dataset = {};
                        tempByCountry = {};
                        tempByCountry = Aug2013;

                        console.log(tempByCountry);
                        setCountryCodes();
                        map.updateChoropleth(null, {reset: true})
                        updateMap(paletteScale,tempByCountry); 
                        set = 0;
                        d3.select(".h2header").text("Augustus 2012");
                    }
                    
                });
