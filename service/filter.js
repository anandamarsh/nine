/**
 * Created by amarshanand on 2/07/2016.
 */

module.exports = {
    
    // if someone would like to abbreveate the language
    doFilter: function(req, done) {

        console.log("req.body : "+JSON.stringify(req.body));

        // error for empty body or invalid format
        if(!req.body || !req.body.payload || !(req.body.payload instanceof Array)) { console.log("Either body is empty or payload is missing or is not an Array"); return done(); }

        // process each section in the payload
        var result = [];
        for(var i=0; i<req.body.payload.length; i++){
            var section = req.body.payload[i];
            //console.log("section "+JSON.stringify(section));
            // ensure that all key fields are present and drm is true and episodeCount>0
            if( (!section || !section.hasOwnProperty("drm") || typeof(section.drm)!=="boolean" || section.drm==false) ||
                (!section.hasOwnProperty("episodeCount") || isNaN(section.episodeCount) || parseInt(section.episodeCount)<=0) ||
                (!section.hasOwnProperty("image") || !section.image.hasOwnProperty("showImage") || !section.hasOwnProperty("slug") || !section.hasOwnProperty("title"))
            ) {
                //console.log("Something is missing in this section. I am skipping it");
                continue;
            }
            // since its a healthy section, add it in
            //console.log("pushing healthy section : "+JSON.stringify({image:section.image.showImage, slug:section.slug, title:section.title}));
            result.push({image:section.image.showImage, slug:section.slug, title:section.title});
        }

        // finally, send back the result
        //console.log("sending back : "+JSON.stringify(result));
        done(result);

    }

}