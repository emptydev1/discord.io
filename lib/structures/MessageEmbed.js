const {normalizeArray} = require("../util/Util");


/**
* A embed constructor for messages.
* @prop {Object?} data The data of this embed
*/

class MessageEmbed {
    constructor(data = {}) {
		this.data = {...data};

		if (data?.timestamp) this.data.timestamp = new Date(data.timestamp);
	}


	/**
    * Sets a author of this embed.
	*
    * @param options - Options for the author
	*/
	author(options) {
		if (options == undefined) {
			this.data.author = undefined;
			return this;
		}

		
		this.data.author = {
			name: options?.name,
			icon_url: options?.iconURL,
			url: options?.url
		}

		return this;
	}

	/**
    * Sets a title of this embed.
	* 
    * @param title - The title
	*/
    title(title) {
		this.data.title = title;

		return this;
	}

	/**
    * Sets a description of this embed.
	*
    * @param description - The description
	*/
	description(description) {
		this.data.description = description;

        return this;
	}

	/**
    * Append fields of this embed.
	*
    * @remarks
	* The maximum amount of fields is 25.
	* 
    * @example
	* Using an Array :
    * ```js
	* const fields = [
    *    ...
	* ]
    * 
	* const embed = new EmbedBuilder()
    *          .addFields(fields)
	* ```
    *
    * @example
	* Using rest parameters :
	* ```js
    * const embed = new EmbedBuilder()
	*          .addFields(
    *                 { name: 'Field 1', value: 'Value 1' },
    *                 { name: 'Field 2', value: 'Value 2' }
	*          )
    * ```
	*
	* @param fields - Fields to add
	*/
	fields(...fields) {
		fields = NormalizeArray(fields);

		if (this.data.fields) this.data.fields(...fields);
		else this.data.fields = fields;

		return this;
	}

	/**
    * Sets a footer of this embed.
	*
    * @param options - Options for the footer
	*/
	footer(options) {
		if (!options) {
			this.data.footer = undefined;
			return this;
		}

		this.data.footer = {
			text: options?.text,
			icon_url: options?.iconURL
		}

		return this;
	}

	/**
    * Sets timestamp on this embed.
	* 
    * @param ms - milissegundos of timestamp
	*/
	timestamp(ms) {
		this.data.timestamp = ms ? new Date(ms).toISOString() : new Date().toISOString();

		return this;
	}

	/**
    * Sets a inage of this embed.
	*
    * @param url - URL of the image 
	*/
	image(url) {
		this.data.image = url ? {url} : undefined;

		return this;
	}

	/**
    * Sets a thumbnail of this embed.
	*
    * @param url - URL of the image
	*/
	thumbnail(url) {
		this.data.thumbnail = url ? {url} : undefined;

		return this;
	}

	/**
    * Sets the URL of this embed.
	* 
    * @param url - the URL
	*/
	URL(url) {
		this.data.url = url ?? undefined;

		return this;
	}
	
	/**
    * Sets a color of this embed.
	* 
	* @param color - Color of embed
    */
	color(color) {
		this.data.color = color ? parseInt(color.replace("#", ""), 16) : undefined;

		return this;
	}

}


module.exports = MessageEmbed;