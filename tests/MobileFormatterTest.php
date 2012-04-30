<?php

/**
 * @group MobileFrontend
 */
class MobileFormatterTest extends MediaWikiTestCase {
	/**
	 * @dataProvider getXhtmlData
	 */
	public function testXhtmlTransform( $input, $expected, $callback = false ) {
		$t = Title::newFromText( 'Mobile' );
		$input = str_replace( "\r", '', $input ); // "yay" to Windows!
		$mf = new MobileFormatter( MobileFormatter::wrapHTML( $input ), $t, 'XHTML' );
		if ( $callback ) {
			$callback( $mf );
		}
		$mf->filterContent();
		$html = $mf->getText();
		$this->assertEquals( str_replace( "\n", '', $expected ), str_replace( "\n", '', $html ) );
	}

	public function getXhtmlData() {
		return array(
			// down with infoboxes
			array(
				'<div class="infobox">Insanity!</div>',
				'',
			),
			// remove magnifying glass
			array(
				'<div class="thumb tright"><div class="thumbinner" style="width:222px;"><a href="/wiki/File:Foo.jpg" class="image">
<img alt="" src="/foo.jpg" width="220" height="165" class="thumbimage"/></a><div class="thumbcaption">
<div class="magnify"><a href="/wiki/File:Foo.jpg" class="internal" title="Enlarge"></div>
Foobar!</div></div></div>',
				'<div class="thumb tright"><div class="thumbinner" style="width:222px;"><a href="/wiki/File:Foo.jpg" class="image"><img alt="" src="/foo.jpg" width="220" height="165" class="thumbimage"></a><div class="thumbcaption">Foobar!</div></div></div>',
			),
			array(
				'fooo
<div id="mp-itn">bar</div>
<div id="mf-custom" title="custom">blah</div>',
				'<div id="mainpage"><h2>In The News</h2><div id="mp-itn">bar</div><h2>custom</h2><div id="mf-custom" title="custom">blah</div><br clear="all"></div>',
				function( MobileFormatter $mf ) { $mf->setIsMainPage( true ); },
			),
		);
	}
}