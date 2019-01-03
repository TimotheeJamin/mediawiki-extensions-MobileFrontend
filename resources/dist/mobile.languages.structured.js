this.mfModules=this.mfModules||{},this.mfModules["mobile.languages.structured"]=(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{20:function(e,a,t){var n=mw.log,s=t(0);e.exports={getDir:function(e){var a=["aeb","aeb-arab","ar","arc","arq","arz","azb","bcc","bgn","bqi","ckb","dv","fa","glk","he","khw","kk-arab","kk-cn","ks","ks-arab","ku-arab","lki","lrc","luz","mzn","pnb","ps","sd","sdh","skr","skr-arab","ug","ug-arab","ur","yi"].indexOf(e.lang)>-1?"rtl":"ltr";return s.extend({},e,{dir:a})},getStructuredLanguages:function(e,a,t,s){var r=Object.prototype.hasOwnProperty,i=0,g=0,u=0,o=[],l=[],d=this;function c(e){return e.dir?e:(u++,d.getDir(e))}return(s=function(e,a){var t,n,s=Object.prototype.hasOwnProperty,r={};if(a)return-1!==(n=a.indexOf("-"))&&(t=a.slice(0,n)),e.forEach(function(e){e.lang!==t&&e.lang!==a||(r[e.lang]=!0)}),s.call(r,a)?a:s.call(r,t)?t:void 0}(e,s))&&(Object.keys(t).forEach(function(e){var a=t[e];i=i<a?a:i,g=g>a?a:g}),t[s]=i+1),e.map(c).forEach(function(e){r.call(t,e.lang)?(e.frequency=t[e.lang],o.push(e)):l.push(e)}),a&&a.map(c).forEach(function(e){r.call(t,e.lang)?e.frequency=t[e.lang]:e.frequency=g-1,o.push(e)}),o=o.sort(function(e,a){return a.frequency-e.frequency}),l=l.sort(function(e,a){return e.autonym.toLocaleLowerCase()<a.autonym.toLocaleLowerCase()?-1:1}),n.warn(0===u?"Direction is provided. Please remove handling in getStructuredLanguages":"`dir` attribute was missing from languages. Is T74153 resolved?"),{suggested:o,all:l}},getFrequentlyUsedLanguages:function(){var e=mw.storage.get("langMap");return e?JSON.parse(e):{}},saveFrequentlyUsedLanguages:function(e){mw.storage.set("langMap",JSON.stringify(e))},saveLanguageUsageCount:function(e,a){var t=a[e]||0;t+=1,a[e]=t>100?100:t,this.saveFrequentlyUsedLanguages(a)}}},28:function(e,a,t){var n=t(12),s=t(0),r=t(20);function i(e){var a;a=r.getStructuredLanguages(e.languages,e.variants,r.getFrequentlyUsedLanguages(),e.deviceLanguage),e.allLanguages=a.all,e.allLanguagesCount=a.all.length,e.suggestedLanguages=a.suggested,e.suggestedLanguagesCount=a.suggested.length,n.call(this,s.extend(e,{className:"overlay language-overlay"}))}t(1)(i,n,{defaults:s.extend({},n.prototype.defaults,{heading:mw.msg("mobile-frontend-language-heading"),inputPlaceholder:mw.msg("mobile-frontend-languages-structured-overlay-search-input-placeholder"),allLanguagesHeader:mw.msg("mobile-frontend-languages-structured-overlay-all-languages-header").toLocaleUpperCase(),suggestedLanguagesHeader:mw.msg("mobile-frontend-languages-structured-overlay-suggested-languages-header").toLocaleUpperCase()}),templatePartials:s.extend({},n.prototype.templatePartials,{content:mw.template.get("mobile.languages.structured","LanguageOverlay.hogan")}),events:s.extend({},n.prototype.events,{"click a":"onLinkClick","input .search":"onSearchInput"}),postRender:function(){n.prototype.postRender.apply(this),this.$siteLinksList=this.$(".site-link-list"),this.$languageItems=this.$siteLinksList.find("a"),this.$subheaders=this.$("h3")},onLinkClick:function(e){var a=this.$(e.currentTarget).attr("lang"),t=this,n=this.$languageItems.filter(":visible");r.saveLanguageUsageCount(a,r.getFrequentlyUsedLanguages()),n.each(function(e,n){if(t.$(n).hasClass(a))return!1})},onSearchInput:function(e){this.filterLanguages(this.$(e.target).val().toLowerCase())},filterLanguages:function(e){var a=[];e?(this.options.languages.forEach(function(t){var n=t.langname;(t.autonym.toLowerCase().indexOf(e)>-1||n&&n.toLowerCase().indexOf(e)>-1||t.lang.toLowerCase().indexOf(e)>-1)&&a.push(t.lang)}),this.options.variants&&this.options.variants.forEach(function(t){(t.autonym.toLowerCase().indexOf(e)>-1||t.lang.toLowerCase().indexOf(e)>-1)&&a.push(t.lang)}),this.$languageItems.addClass("hidden"),a.length&&this.$siteLinksList.find("."+a.join(",.")).removeClass("hidden"),this.$siteLinksList.addClass("filtered"),this.$subheaders.addClass("hidden")):(this.$languageItems.removeClass("hidden"),this.$siteLinksList.removeClass("filtered"),this.$subheaders.removeClass("hidden"))}}),e.exports=i},86:function(e,a,t){var n=t(28);mw.mobileFrontend.define("mobile.languages.structured/LanguageOverlay",n),e.exports=n}},[[86,0,1]]]);
//# sourceMappingURL=mobile.languages.structured.js.map.json