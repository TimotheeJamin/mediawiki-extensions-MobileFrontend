this.mfModules=this.mfModules||{},this.mfModules["mobile.editor.ve"]=(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"./src/mobile.editor.ve/mobile.editor.ve.js":function(e,t,o){var r=o("./src/mobile.editor.ve/ve.init.mw.MobileFrontendArticleTarget.js"),i=o("./src/mobile.editor.ve/schemaVisualEditorFeatureUse.js");ve.init.mw.MobileFrontendArticleTarget=r,ve.init.mw.targetFactory.register(r),i(),ve.trackSubscribe("activity.",function(e,t){mw.track("mf.schemaVisualEditorFeatureUse",ve.extendObject(t,{feature:e.split(".")[1],editing_session_id:ve.init.target.overlay.sessionId}))})},"./src/mobile.editor.ve/schemaVisualEditorFeatureUse.js":function(e,t){e.exports=function(){var e=!!mw.util.getParamValue("trackdebug");(null!==mw.loader.getState("schema.VisualEditorFeatureUse")||e)&&mw.loader.using(["ext.eventLogging.subscriber"]).then(function(){var t=mw.eventLog.Schema,o=mw.config.get("wgWMESchemaEditAttemptStepSamplingRate"),r=new t("VisualEditorFeatureUse",o);mw.trackSubscribe("mf.schemaVisualEditorFeatureUse",function(t,i){var a={feature:i.feature,action:i.action,editingSessionId:i.editing_session_id};e?function(){console.log.apply(console,arguments)}(t,a):r.log(a,mw.config.get("wgWMESchemaEditAttemptStepOversample")||"visualeditor"===mw.config.get("wgMFSchemaEditAttemptStepOversample")||"all"===mw.config.get("wgMFSchemaEditAttemptStepOversample")?1:o)})})}},"./src/mobile.editor.ve/ve.init.mw.MobileFrontendArticleTarget.js":function(e,t,o){
/*!
 * VisualEditor MediaWiki Initialization MobileFrontendArticleTarget class.
 *
 * @copyright 2011-2015 VisualEditor Team and others; see AUTHORS.txt
 * @license The MIT License (MIT); see LICENSE.txt
 */
var r=ve.init.mw.MobileArticleTarget,i=o("./src/mobile.editor.overlay/parseSaveError.js"),a=ve.init.mw.Target;function s(e,t){this.overlay=e,this.$overlay=e.$el,this.$overlaySurface=e.$el.find(".surface"),s.super.call(this,t),this.$element.addClass("ve-init-mw-mobileFrontendArticleTarget")}OO.inheritClass(s,r),s.static.parseSaveError=i,s.prototype.destroy=function(){s.super.prototype.destroy.call(this),this.$overlay.css("padding-top","")},s.prototype.isToolbarOverSurface=function(){return!0},s.prototype.onContainerScroll=function(){},s.prototype.onSurfaceScroll=function(){var e,t;ve.init.platform.constructor.static.isIos()&&(e=this.getSurface().getView().nativeSelection).rangeCount&&"true"===document.activeElement.contentEditable&&(t=e.getRangeAt(0),e.removeAllRanges(),e.addRange(t))},s.prototype.createSurface=function(e,t){var o;return this.overlay.isNewPage&&(t=ve.extendObject({placeholder:mw.msg("mobile-frontend-editor-placeholder-new-page",mw.user)},t)),(o=s.super.prototype.createSurface.call(this,e,t)).connect(this,{scroll:"onSurfaceScroll"}),o},s.prototype.setSurface=function(e){var t=e!==this.surface;a.super.prototype.setSurface.apply(this,arguments),t&&(e.$element.addClass("content"),this.$overlaySurface.append(e.$element))},s.prototype.surfaceReady=function(){var e=this.getSurface();this.teardownPromise||(s.super.prototype.surfaceReady.apply(this,arguments),this.overlay.hideSpinner(),e.getContext().connect(this,{resize:"adjustContentPadding"}),this.adjustContentPadding(),this.maybeShowWelcomeDialog())},s.prototype.adjustContentPadding=function(){var e=this.getToolbar().$element.outerHeight();this.getSurface().setToolbarHeight(e),this.$overlay.css("padding-top",e),this.getSurface().scrollCursorIntoView()},s.prototype.loadFail=function(e,t){s.super.prototype.loadFail.apply(this,arguments),this.overlay.reportError(t),this.overlay.hide()},s.prototype.editSource=function(){var e=this;this.getSurface().getModel().hasBeenModified()?OO.ui.confirm(mw.msg("mobile-frontend-editor-switch-confirm")).then(function(t){t&&e.showSaveDialog()}):this.overlay.switchToSourceEditor()},s.prototype.save=function(){s.super.prototype.save.apply(this,arguments),this.overlay.log({action:"saveAttempt"})},s.prototype.showSaveDialog=function(){s.super.prototype.showSaveDialog.apply(this,arguments),this.overlay.log({action:"saveIntent"})},s.prototype.saveComplete=function(){var e=this.getSectionFragmentFromPage();s.super.prototype.saveComplete.apply(this,arguments),this.overlay.sectionId=e,this.overlay.onSaveComplete()},s.prototype.saveFail=function(e,t,o,r,i,a){s.super.prototype.saveFail.apply(this,arguments),this.overlay.onSaveFailure(this.constructor.static.parseSaveError(a,i))},s.prototype.tryTeardown=function(){s.super.prototype.tryTeardown.apply(this,arguments).then(function(){window.history.back()})},s.prototype.load=function(){var e;return(e=ve.init.Target.prototype.addSurface.call(this,new ve.dm.Document([{type:"paragraph"},{type:"/paragraph"},{type:"internalList"},{type:"/internalList"}]))).setReadOnly(!0),this.setSurface(e),s.super.prototype.load.apply(this,arguments)},s.prototype.setupToolbar=function(e){var t=this.overlay.$el.find(".overlay-header-container");s.super.prototype.setupToolbar.call(this,e),this.overlay.options.switched||(t.addClass("toolbar-hidden"),setTimeout(function(){t.addClass("toolbar-shown"),setTimeout(function(){t.addClass("toolbar-shown-done")},250)}))},s.prototype.attachToolbar=function(){this.overlay.$el.find(".overlay-header > .toolbar").append(this.toolbar.$element),this.toolbar.initialize()},e.exports=s}},[["./src/mobile.editor.ve/mobile.editor.ve.js",0,1]]]);
//# sourceMappingURL=mobile.editor.ve.js.map.json