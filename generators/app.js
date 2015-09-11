module.exports = {
    	properties: {
    		name: {
        		pattern: /^[a-zA-Z\s\-]+$/,
        		message: 'Name must be only letters, spaces, or dashes',
        		required: true
		}
	}
}
