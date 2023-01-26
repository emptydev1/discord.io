'use strict';

/**
 * A embed constructor for embedded messages
 * @param {?object} data The data of this embed
 */
 
class MessageEmbed {
    constructor(data = null) {
        /**
         * Defines the data of this embed
         * @type {object}
         * @private
         */
        this.data = data ?? {};
    }
    
    /**
     * Sets the author of this embed 
     * @param {object} [options] The options for this author
     * @param {string} [options.text] The text of the author
     * @param {string} [options.icon_url] The image URL for this author
     * @param {string} [options.url] The redirect URL
     */
     setAuthor(options = {}) {
         this.author = {
             name: options?.text ?? void 0,
             icon_url: options?.icon_url ?? void 0,
             url: options?.url ?? void 0
         };
         
         return this;
     }
     
    /**
     * Set the title of embed
     * @param {string} title The text that should be in the title 
     */
     setTitle(title) {
         this.data.title = title ?? void 0;
         
         return this;
     }
     
     /**
      * The description of this embed
      * @param {string} description The text that should be in the embed description 
      */
      setDescription(description) {
          this.description = description ?? void 0;
          
          return this;
      }
      
      /**
       * The fields of this embed 
       * @param {object} fields An array with the fields for this embed
       * @remarks The embed must only contain a maximum of 25 fields 
       */
       setFields(fields = []) {
           this.fields = fields ?? [];
           
           return this;
       }
       
       /**
        * The footer of this embed 
        * @param {object} [options] The options for this footer
        * @param {?string} [options.text] The text that should appear in this footer 
        * @param {?string} [options.icon_url] The image URL for this footer
        */
        setFooter(options = {}) {
            this.footer = {
                text: options?.text,
                icon_url: options?.icon_url
            };
            
            return this;
        }
        
        /**
         * Sets timestamp on this embed 
         * @param {?number} ms The time ( in milliseconds ) that should appear in this embed timestamp
         * @info Default is the date now
         */
         timestamp(ms = Date.now()) {
             this.timestamp = new Date(ms).toISOString();
             
             return this;
         }
         
         /**
          * Sets the thumbnail of this embed
          * @param {string} url The URL of this embed thumbnail
          */
          setThumbnail(url) {
              this.thumbnail = url ? { url } : void 0;
              
              return this;
          }
          
          /**
           * Sets the image of this embed
           * @param {string} url The URL of this embed image
           */
           setImage(url) {
               this.image = url ? { url } : void 0;
              
              return this;
           }
           
           /**
            * Sets the URL of this embed
            * @param {string} url The URL
            */
           URL(url) {
               this.url = url ?? void 0;
               
               return this;
           }
           
           /**
            * Sets the embed color
            * @param {string|number} hex A hex code or a color number 
            */
           setColor(hex) {
               this.color = parseInt(String(hex).replace('#', ''), 16);
               
               return this;
           }
}


module.exports = MessageEmbed;
