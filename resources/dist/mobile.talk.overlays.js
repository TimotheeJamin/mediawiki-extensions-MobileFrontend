this.mfModules=this.mfModules||{},this.mfModules["mobile.talk.overlays"]=(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"./src/mobile.talk.overlays/AddTopicForm.js":function(e,t,i){var o=i("./src/mobile.startup/mfExtend.js"),s=i("./src/mobile.startup/View.js"),a=i("./src/mobile.startup/Panel.js"),n=i("./src/mobile.startup/util.js");function r(e){var t=new a;return t.$el.append(e),t}function l(e){s.call(this,n.extend(e,{topicTitlePlaceHolder:mw.msg("mobile-frontend-talk-add-overlay-subject-placeholder"),topicContentPlaceHolder:mw.msg("mobile-frontend-talk-add-overlay-content-placeholder"),className:"add-topic-form",events:{"input .wikitext-editor, input":"onTextInput","change .wikitext-editor, input":"onTextInput"}}))}o(l,s,{postRender:function(){var e=this.options,t=e.disabled,i=n.parseHTML("<input>").attr({class:"mw-ui-input",type:"text",disabled:t,value:e.subject,placeholder:e.topicTitlePlaceHolder}),o=n.parseHTML("<textarea>").attr({class:"wikitext-editor mw-ui-input",cols:40,rows:10,disabled:t,placeholder:e.topicContentPlaceHolder}).val(e.body),a=[r(n.parseHTML("<p>").addClass("license").html(e.licenseMsg)),r(i),r(o)];this.$el.append(a.map(function(e){return e.$el})),this.$subject=i,this.$messageBody=o,s.prototype.postRender.apply(this,arguments)},onTextInput:function(){this.options.onTextInput&&this.options.onTextInput(this.$subject.val().trim(),this.$messageBody.val().trim())}}),l.test={makePanel:r},e.exports=l},"./src/mobile.talk.overlays/TalkSectionAddOverlay.js":function(e,t,i){var o=i("./src/mobile.startup/mfExtend.js"),s=i("./src/mobile.startup/Overlay.js"),a=i("./src/mobile.startup/PageGateway.js"),n=i("./src/mobile.startup/util.js"),r=i("./src/mobile.talk.overlays/makeAddTopicForm.js"),l=i("./src/mobile.startup/toast.js"),d=i("./src/mobile.startup/Icon.js");function c(e){this.editorApi=e.api,this.pageGateway=new a(e.api),s.call(this,n.extend(e,{className:"talk-overlay overlay",events:{"click .confirm-save":"onSaveClick"}})),this.title=e.title,this.currentPageTitle=e.currentPageTitle,this.eventBus=e.eventBus,this._saveHit=!1}o(c,s,{defaults:n.extend({},s.prototype.defaults,{cancelMsg:mw.msg("mobile-frontend-editor-cancel"),editingMsg:mw.msg("mobile-frontend-talk-add-overlay-submit"),waitMsg:mw.msg("mobile-frontend-talk-topic-wait"),waitIcon:new d({name:"spinner",additionalClassNames:"savespinner loading"}).toHtmlString()}),template:mw.template.get("mobile.talk.overlays","SectionAddOverlay.hogan"),templatePartials:n.extend({},s.prototype.templatePartials,{contentHeader:mw.template.get("mobile.talk.overlays","SectionAddOverlay/contentHeader.hogan"),saveHeader:mw.template.get("mobile.editor.overlay","saveHeader.hogan")}),postRender:function(){var e;s.prototype.postRender.call(this),e=r({subject:"",body:"",disabled:!1,licenseMsg:this.options.licenseMsg,onTextInput:this.onTextInput.bind(this)}),this.showHidden(".initial-header"),this.$confirm=this.$el.find("button.confirm-save"),this.$el.find(".overlay-content").append(e.$el),this.$subject=e.$el.find("input"),this.$ta=e.$el.find(".wikitext-editor")},hide:function(){var e,t=mw.msg("mobile-frontend-editor-cancel-confirm");return e=!this.$subject.val()&&!this.$ta.val(),!!(this._saveHit||e||window.confirm(t))&&s.prototype.hide.apply(this,arguments)},onTextInput:function(e,t){this.subject=e,this.body=t,clearTimeout(this.timer),this.timer=setTimeout(function(){t&&e?this.$confirm.prop("disabled",!1):this.$confirm.prop("disabled",!0)}.bind(this),250)},onSaveClick:function(){var e=this.title===this.currentPageTitle;this.showHidden(".saving-header"),this.save().then(function(t){"ok"===t&&(e?this.eventBus.emit("talk-added-wo-overlay"):(this.pageGateway.invalidatePage(this.title),l.show(mw.msg("mobile-frontend-talk-topic-feedback")),this.eventBus.emit("talk-discussion-added"),this.hide()))}.bind(this),function(e){var t=mw.msg("mobile-frontend-talk-topic-error");switch(this.$confirm.prop("disabled",!1),e.details){case"protectedpage":t=mw.msg("mobile-frontend-talk-topic-error-protected");break;case"noedit":case"blocked":t=mw.msg("mobile-frontend-talk-topic-error-permission");break;case"spamdetected":t=mw.msg("mobile-frontend-talk-topic-error-spam");break;case"badtoken":t=mw.msg("mobile-frontend-talk-topic-error-badtoken");break;default:t=mw.msg("mobile-frontend-talk-topic-error")}l.show(t,{type:"error"}),this.showHidden(".save-header, .save-panel")}.bind(this))},save:function(){var e=this.subject,t=n.Deferred();return this.$ta.removeClass("error"),this.$subject.removeClass("error"),this._saveHit=!0,this.$el.find(".content").empty().addClass("loading"),this.editorApi.postWithToken("csrf",{action:"edit",section:"new",sectiontitle:e,title:this.title,summary:mw.msg("newsectionsummary",e),text:this.body}).then(function(){return"ok"},function(e){return t.reject({type:"error",details:e})})}}),e.exports=c},"./src/mobile.talk.overlays/TalkSectionOverlay.js":function(e,t,i){var o=mw.user,s=i("./src/mobile.startup/mfExtend.js"),a=i("./src/mobile.startup/PageGateway.js"),n=i("./src/mobile.startup/Overlay.js"),r=i("./src/mobile.startup/util.js"),l=i("./src/mobile.startup/toast.js"),d=i("./src/mobile.talk.overlays/autosign.js"),c=i("./src/mobile.startup/Page.js"),m=i("./src/mobile.startup/Button.js");function p(e){this.editorApi=e.api,this.pageGateway=new a(e.api),n.call(this,r.extend(!0,e,{className:"talk-overlay overlay",events:{"focus textarea":"onFocusTextarea","click .save-button":"onSaveClick"}}))}s(p,n,{templatePartials:r.extend({},n.prototype.templatePartials,{header:mw.template.get("mobile.talk.overlays","Section/header.hogan"),content:mw.template.get("mobile.talk.overlays","Section/content.hogan")}),defaults:r.extend({},n.prototype.defaults,{saveButton:new m({block:!0,additionalClassNames:"save-button",progressive:!0,label:mw.config.get("wgEditSubmitButtonLabelPublish")?mw.msg("mobile-frontend-editor-publish"):mw.msg("mobile-frontend-editor-save")}).options,title:void 0,section:void 0,reply:mw.msg("mobile-frontend-talk-reply"),info:mw.msg("mobile-frontend-talk-reply-info")}),postRender:function(){n.prototype.postRender.apply(this),this.$saveButton=this.$el.find(".save-button"),this.options.section?(this.hideSpinner(),this._enableComments()):this.renderFromApi(this.options)},_enableComments:function(){this.$commentBox=this.$el.find(".comment"),o.isAnon()?this.$commentBox.remove():this.$textarea=this.$commentBox.find("textarea")},renderFromApi:function(e){var t=this;this.pageGateway.getPage(e.title).then(function(i){var o=new c(i);e.section=o.getSection(e.id),t.render(e),t.hideSpinner()})},onFocusTextarea:function(){this.$textarea.removeClass("error")},onSaveClick:function(){var e=this.$textarea.val(),t=this;function i(){t.$saveButton.prop("disabled",!1)}e?(this.showSpinner(),this.$saveButton.prop("disabled",!0),e="\n\n"+d(e),this.editorApi.postWithToken("csrf",{action:"edit",title:this.options.title,section:this.options.id,appendtext:e,redirect:!0}).then(function(){l.show(mw.msg("mobile-frontend-talk-reply-success")),t.pageGateway.invalidatePage(t.options.title),t.renderFromApi(t.options),i()},function(e,o){var s;s=o.error&&["readonly","blocked","autoblocked"].indexOf(o.error.code)>-1?o.error.info:mw.msg("mobile-frontend-editor-error"),t.hideSpinner(),l.show(s,"toast error"),i()})):this.$textarea.addClass("error")}}),e.exports=p},"./src/mobile.talk.overlays/autosign.js":function(e,t){e.exports=function(e){return/~{3,5}/.test(e)?e:e+" ~~~~"}},"./src/mobile.talk.overlays/makeAddTopicForm.js":function(e,t,i){var o=i("./src/mobile.talk.overlays/AddTopicForm.js"),s=i("./src/mobile.talk.overlays/autosign.js");e.exports=function(e){var t=e.licenseMsg,i=e.onTextInput,a=e.subject,n=e.body,r=e.disabled;return new o({licenseMsg:t,disabled:r,subject:a,body:n,onTextInput:i?function(e,t){t&&(t=s(t)),i.call(this,e,t)}:void 0})}},"./src/mobile.talk.overlays/mobile.talk.overlays.js":function(e,t,i){var o=i("./src/mobile.startup/moduleLoaderSingleton.js"),s=i("./src/mobile.talk.overlays/talkBoard.js"),a=i("./src/mobile.startup/talk/overlay.js"),n=i("./src/mobile.startup/PageGateway.js"),r=i("./src/mobile.talk.overlays/TalkSectionAddOverlay.js"),l=i("./src/mobile.talk.overlays/TalkSectionOverlay.js");o.deprecate("mobile.talk.overlays/talkOverlay",function(e){return a(e.title,new n(e.api))},"Use `mobile.startup` (talk.overlay)"),o.define("mobile.talk.overlays/talkBoard",s),o.define("mobile.talk.overlays/TalkSectionAddOverlay",r),o.define("mobile.talk.overlays/TalkSectionOverlay",l)},"./src/mobile.talk.overlays/talkBoard.js":function(e,t,i){var o=i("./src/mobile.startup/util.js"),s=i("./src/mobile.startup/View.js");e.exports=function(e){var t,i=e.length>0?mw.msg("mobile-frontend-talk-explained"):mw.msg("mobile-frontend-talk-explained-empty");return(t=new s({className:"talk-board"})).append([o.parseHTML('<p class="content-header">').text(i),o.parseHTML('<ul class="topic-title-list">').append(e.map(function(e){return o.parseHTML("<li>").append(o.parseHTML("<a>").attr("href","#/talk/"+e.id).text(e.line))}))]),t}}},[["./src/mobile.talk.overlays/mobile.talk.overlays.js",0,1]]]);
//# sourceMappingURL=mobile.talk.overlays.js.map.json