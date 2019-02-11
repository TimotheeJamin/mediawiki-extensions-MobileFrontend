this.mfModules=this.mfModules||{},this.mfModules["mobile.categories.overlays"]=(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"./src/mobile.categories.overlays/CategoryAddOverlay.js":function(e,t,s){var i=s("./src/mobile.startup/Overlay.js"),a=s("./src/mobile.startup/mfExtend.js"),o=s("./src/mobile.startup/util.js"),n=s("./src/mobile.categories.overlays/CategoryGateway.js"),r=s("./src/mobile.categories.overlays/CategoryLookupInputWidget.js"),l=s("./src/mobile.startup/icons.js"),c=s("./src/mobile.startup/toast.js"),g=mw.loader.require("mediawiki.router");function d(e){e.heading=mw.msg("mobile-frontend-categories-add-heading",e.title),this.eventBus=e.eventBus,i.call(this,o.extend({className:"category-overlay overlay",events:{"click .save":"onSaveClick","click .suggestion":"onCategoryClick"}},e))}a(d,i,{defaults:o.extend({},i.prototype.defaults,{headerButtonsListClassName:"header-action",waitMsg:mw.msg("mobile-frontend-categories-add-wait"),waitIcon:l.spinner().toHtmlString()}),template:mw.template.get("mobile.categories.overlays","CategoryAddOverlay.hogan"),templatePartials:o.extend({},i.prototype.templatePartials,{header:mw.template.get("mobile.categories.overlays","CategoryAddOverlayHeader.hogan"),saveHeader:mw.template.get("mobile.editor.overlay","saveHeader.hogan")}),postRender:function(){var e;i.prototype.postRender.apply(this),this.$suggestions=this.$(".category-suggestions"),this.$saveButton=this.$(".save"),this.wgCategories=this.options.categories,this.title=this.options.title,this.gateway=new n(this.options.api),e=new r({gateway:this.gateway,suggestions:this.$suggestions,categories:this.wgCategories,saveButton:this.$saveButton}),this.$(".category-add-input").append(e.$element)},onCategoryClick:function(e){this.$(e.target).closest(".suggestion").detach(),this.$(".suggestion").length>0?this.$saveButton.prop("disabled",!1):this.$saveButton.prop("disabled",!0)},onSaveClick:function(){var e="",t=this;this.showHidden(".saving-header"),this.$(".suggestion").each(function(){var s=t.$(this).data("title");s&&(e+="\n[["+s+"]] ")}),0===e.length?c.show(mw.msg("mobile-frontend-categories-nodata"),"error"):this.gateway.save(this.title,e).then(function(){g.navigate("#"),mw.notify(mw.msg("mobile-frontend-categories-notification"))},function(){t.showHidden(".initial-header"),t.$safeButton.prop("disabled",!1),c.show(mw.msg("mobile-frontend-categories-nodata"),"toast error")})}}),e.exports=d},"./src/mobile.categories.overlays/CategoryGateway.js":function(e,t,s){var i,a=s("./src/mobile.startup/actionParams.js"),o=s("./src/mobile.startup/util.js"),n=s("./src/mobile.startup/search/SearchGateway.js");function r(){r.parent.apply(this,arguments)}i={continueParams:{},canContinue:!0,searchNamespace:14,save:function(e,t){return this.api.postWithToken("csrf",{action:"edit",title:e,appendtext:t,summary:mw.msg("mobile-frontend-categories-summary")})},getCategories:function(e){var t,s=this;return!1!==this.canContinue&&(t=o.extend({},{prop:"categories",titles:e,clprop:"hidden",cllimit:50},this.continueParams),this.api.get(a(t)).then(function(e){return void 0!==e.continue?s.continueParams=e.continue:s.canContinue=!1,e}))}},OO.inheritClass(r,n),o.extend(r.prototype,i),e.exports=r},"./src/mobile.categories.overlays/CategoryLookupInputWidget.js":function(e,t){function s(e){this.gateway=e.gateway,this.$suggestions=e.suggestions,this.categories=e.categories||[],this.$saveButton=e.saveButton,e.placeholder=mw.msg("mobile-frontend-categories-search"),OO.ui.TextInputWidget.call(this,e),OO.ui.mixin.LookupElement.call(this,e)}OO.inheritClass(s,OO.ui.TextInputWidget),OO.mixinClass(s,OO.ui.mixin.LookupElement),s.prototype.onLookupMenuItemChoose=function(e){var t=new OO.ui.ButtonWidget({icon:"check",label:e.label,classes:["suggestion","suggested"],flags:["progressive","primary"]});t.$element.attr("data-title",e.data),this.$suggestions.append(t.$element),this.$saveButton.prop("disabled",!1)},s.prototype.getLookupRequest=function(){return this.gateway.search(this.value)},s.prototype.getLookupCacheDataFromResponse=function(e){var t=new mw.Title(this.value,14);return e.results.unshift({title:t.toString(),displayTitle:t.getNameText()}),e},s.prototype.getLookupMenuOptionsFromData=function(e){var t=[],s=this.$element,i=this;return e.results.forEach(function(e){s.find('div[data-title="'+e.title+'"]').length||-1!==i.categories.indexOf(e.displayTitle)||t.push(new OO.ui.MenuOptionWidget({data:e.title,label:e.displayTitle}))}),t},e.exports=s},"./src/mobile.categories.overlays/CategoryTabs.js":function(e,t,s){var i=s("./src/mobile.startup/mfExtend.js"),a=s("./src/mobile.startup/util.js"),o=s("./src/mobile.startup/View.js"),n=s("./src/mobile.startup/ScrollEndEventEmitter.js"),r=s("./src/mobile.categories.overlays/CategoryGateway.js");function l(e){this.scrollEndEventEmitter=new n(e.eventBus),this.scrollEndEventEmitter.on(n.EVENT_SCROLL_END,this._loadCategories.bind(this)),this.gateway=new r(e.api),o.call(this,a.extend({events:{"click .catlink":"onCatlinkClick"}},e))}i(l,o,{isTemplateMode:!0,defaults:{normalcatlink:mw.msg("mobile-frontend-categories-normal"),hiddencatlink:mw.msg("mobile-frontend-categories-hidden")},template:mw.template.get("mobile.categories.overlays","CategoryTabs.hogan"),templatePartials:{item:mw.template.get("mobile.categories.overlays","CategoryTab.hogan")},postRender:function(){o.prototype.postRender.apply(this),this._loadCategories()},hideSpinner:function(){this.$(".spinner").hide()},showSpinner:function(){this.$(".spinner").show()},_loadCategories:function(){var e,t=this,s=this.$(".normal-catlist"),i=this.$(".hidden-catlist");this.scrollEndEventEmitter.setElement(this.$el),this.scrollEndEventEmitter.disable(),!1!==(e=this.gateway.getCategories(this.options.title))?e.then(function(e){e.query&&e.query.pages?(e.query.pages.forEach(function(e){e.categories&&e.categories.forEach(function(e){var a=mw.Title.newFromText(e.title,e.ns);e.hidden?i.append(t.templatePartials.item.render({url:a.getUrl(),title:a.getNameText()})):s.append(t.templatePartials.item.render({url:a.getUrl(),title:a.getNameText()}))})}),0===s.length&&0===s.length?t.$(".content-header").text(mw.msg("mobile-frontend-categories-nocat")):0===s.length&&s.length>0&&this._changeView()):t.$(".content-header").text(mw.msg("mobile-frontend-categories-nocat")),t.hideSpinner(),t.scrollEndEventEmitter.enable()}):t.hideSpinner()},onCatlinkClick:function(e){e.preventDefault(),this.$(e.target).parent().hasClass("selected")||this._changeView()},_changeView:function(){this.$(".category-header li").toggleClass("selected"),this.$(".topic-title-list").toggleClass("hidden")}}),e.exports=l},"./src/mobile.categories.overlays/categoryOverlay.js":function(e,t,s){var i=s("./src/mobile.startup/Overlay.js"),a=s("./src/mobile.categories.overlays/CategoryTabs.js");e.exports=function(e){var t,s,o=e.isAnon?[]:[{href:"#/categories/add",className:"add continue",msg:mw.msg("mobile-frontend-categories-add")}];return t=new i({className:"category-overlay overlay",heading:mw.msg("mobile-frontend-categories-heading"),headerButtonsListClassName:"header-action",headerButtons:o}),s=new a({eventBus:e.eventBus,api:e.api,title:e.title,subheading:mw.msg("mobile-frontend-categories-subheading")}),t.$(".overlay-content").append(s.$el),t}},"./src/mobile.categories.overlays/mobile.categories.overlays.js":function(e,t,s){var i=s("./src/mobile.startup/moduleLoaderSingleton.js"),a=s("./src/mobile.categories.overlays/CategoryAddOverlay.js"),o=s("./src/mobile.categories.overlays/categoryOverlay.js");i.define("mobile.categories.overlays/CategoryAddOverlay",a),i.define("mobile.categories.overlays/categoryOverlay",o)}},[["./src/mobile.categories.overlays/mobile.categories.overlays.js",0,1]]]);
//# sourceMappingURL=mobile.categories.overlays.js.map.json