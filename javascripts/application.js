// FIXME: make this an object with a constructor to facilitate testing
// (see https://bugzilla.wikimedia.org/show_bug.cgi?id=44264)
/**
 * mobileFrontend namespace
 * @class mw.mobileFrontend
 * @singleton
 */
( function ( M, $ ) {
	var currentPage, skin,
		PageApi = M.require( 'PageApi' ),
		pageApi = new PageApi(),
		Page = M.require( 'Page' ),
		MainMenu = M.require( 'MainMenu' ),
		Skin = M.require( 'Skin' );

	/**
	 * Initialize viewport
	 * @method
	 */
	function init() {
		skin = new Skin( {
			el: '#mw-mf-viewport',
			tabletModules: mw.config.get( 'skin' ) === 'minerva' ? [ 'tablet.scripts' ] : [],
			page: getCurrentPage(),
			mainMenu: M.mainMenu || new MainMenu()
		} );
		M.define( 'skin', skin );

		$( window ).on( 'resize', $.proxy( M, 'emit', 'resize' ) );
		$( window ).on( 'scroll', $.proxy( M, 'emit', 'scroll' ) );
	}

	/**
	 * Get current page view object
	 * FIXME: Move to M.define( 'page' )
	 * @method
	 * @return {Page}
	 */
	function getCurrentPage() {
		if ( currentPage ) {
			return currentPage;
		} else {
			return loadCurrentPage();
		}
	}

	/**
	 * Constructs an incomplete Page object representing the currently loaded page.
	 *
	 * @method
	 * @private
	 * @ignore
	 */
	function loadCurrentPage() {
		var permissions = mw.config.get( 'wgRestrictionEdit', [] );
		if ( permissions.length === 0 ) {
			permissions.push( '*' );
		}
		currentPage = new Page( {
			el: '#content',
			title: mw.config.get( 'wgPageName' ).replace( /_/g, ' ' ),
			protection: {
				edit: permissions
			},
			isMainPage: mw.config.get( 'wgIsMainPage' ),
			isWatched: $( '#ca-watch' ).hasClass( 'watched' ),
			sections: pageApi.getSectionsFromHTML( $( '#content' ) ),
			id: mw.config.get( 'wgArticleId' ),
			namespaceNumber: mw.config.get( 'wgNamespaceNumber' )
		} );
		return currentPage;
	}

	$.extend( M, {
		getCurrentPage: getCurrentPage
	} );

	M.define( 'pageApi', pageApi );

	// Initialize
	$( init );
}( mw.mobileFrontend, jQuery ) );
