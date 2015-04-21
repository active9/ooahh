module.exports = {
    	properties: {
    		dependencies: {
        		pattern: /^[a-zA-Z\s\-]+$/,
        		message: 'Dependencies must be a list of any npm packages you wish to require (ex: express bower)',
        		required: false
		}
	}
}