if(window.LTX_STATIC_HOST === undefined) {
  window.LTX_STATIC_HOST = 'cs15.livetex.ru';
}
if(window.LTX_CS_HOST === undefined) {
  window.LTX_CS_HOST = 'cs15.livetex.ru';
}
// Preloader
var divElements = document.getElementsByTagName('div');
for (var jixt=0; jixt < divElements.length; jixt++ ){
	if (divElements[jixt].id.search('liveTexButton_') != -1){
		var port = window.livetexTest ? (':' + window.livetexTest) : '';
		divElements[jixt].innerHTML = '<img src="'+ (/https/.test(document.location.href) ? 'https' : 'http')
				                               +'://' + window.LTX_STATIC_HOST + port + '/img/loadbtn.gif" width="80" height="12" class="livetexBtnPreloader" />';
	}
}
window.livetexTestLoadingFSB = 'undef: step = start';
window.livetexTestLink = '';

//setTimeout( function(){
//	if (window.livetexTestLoadingFSB !== '1')
//		{
//		if (!window.livetexTestLoadingFSB) window.livetexTestLoadingFSB = 'undef';
//		if (!window.livetexTestLink) window.livetexTestLink = 'nolink';
//		jquery15.post(/https/.test(document.location.href) ? 'https' : 'http' + '://cs15.livetex.ru/buglog_fsb7.php?b=' + encodeURIComponent(navigator.userAgent) +
//													'&u=[' + encodeURIComponent('[' + document.location.href + ']').split('#').join('') + ']' +
//													'&f=' + encodeURIComponent(window.livetexTestLoadingFSB),
//				{ 'link' : encodeURIComponent(livetexTestLink)} );
//		}
//}, 15000 );

if (window.liveTex && window.liveTexID && window.liveTex_object) {
	window.liveTex = function (site_id)
	{
		var _lab, _auto, _soundL, _session_id, _server,
			_site_id = site_id,
			port = window.livetexTest ? (':' + window.livetexTest) : '',
			http = /https/.test(document.location.href) ? 'https' : 'http',
				logOn = /livetexLog/.test(document.location.href),
			flag_loaded = false,
			flag_js_loaded = false,
			timestamp = {},
			warning_time,
			use_visits,
			use_pages,
			httpservLink ='';

    var prechatFields = {};
		var scriptSafeLoader = function( url, method, callback, name ){
			var counter = 0,
				isLoaded = false,
				firstTimestamp = timestamp.check();

			var _load = function( url, method, callback )
				{
					var ajaxResult;
					counter  += 1;

					ajaxResult = jquery15.ajax({
					    url : url,
					    dataType : method,
					    timeout : (counter * 1000 + 5000)
					});

					if (typeof ajaxResult.fail !== 'undefined') ajaxResult.fail(_error);
					else ajaxResult.error(_error);
					ajaxResult.success(callback);
				};

			var _jsonpLoad = function ( url, callback )
				{
					_load( url, 'jsonp',    function( data )
											{
												if (isLoaded) return;
												else          isLoaded = true;
												callback( data );
											}
					);
				};

			var _scriptLoad = function( url, callback )
				{
					_load( url, 'script',   function()
										    {
												if (isLoaded) return;
												else          isLoaded = true;
												callback();
											}
					);
				};

			var _startLoad = function(  )
				{
					switch(method){
						case 'jsonp' : _jsonpLoad( url, callback ); break;
						case 'script': _scriptLoad( url, callback ); break;
						default: return;
					}
				};

			var _error = function( )
				{
					var add = '';
					if (isLoaded) return ;
					add +=  '_' + url
							+ '_' + (_session_id || 'none')
							+ '_' + firstTimestamp
							+ '_' + timestamp.check() +'_';


					if (counter < 6) setTimeout( _startLoad, 1000);
					else    				   _postError('timeout_'+ name, add, '');
				};

			_startLoad();
		};


    var base64 = {};
    base64.__KEYS_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    base64.encode = function(string, opt_forUrl) {
      var result = '';
      var str = base64.__utfEncode(string);
      if (window.btoa !== undefined) {
        result = window.btoa(str);
      } else {
        var chr1, chr2, chr3,
          enc1, enc2, enc3, enc4;
        var i = 0;
        while (i < str.length) {
          chr1 = str.charCodeAt(i++);
          chr2 = str.charCodeAt(i++);
          chr3 = str.charCodeAt(i++);
          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;
          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }
          result += base64.__KEYS_STR.charAt(enc1) +
            base64.__KEYS_STR.charAt(enc2) +
            base64.__KEYS_STR.charAt(enc3) +
            base64.__KEYS_STR.charAt(enc4);
        }
      }
      if (opt_forUrl) {
        result = result.replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/\=+\s*$/g, '');
      }
      return result;
    };
    base64.__utfEncode = function(string) {
      string = string.replace(/\r\n/g,"\n");
      var utftext = "";
      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
          utftext += String.fromCharCode(c);
        }
        else if((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
      }
      return utftext;
    };


		window.livetexTestLoadingFSB = 'undef: step = livetex start';

		timestamp.start = new Date().getTime();
		timestamp.check = function(){ return new Date().getTime() - this.start;  };
		timestamp.step  = function(num)
		{
			//if (num == 4 && (this.check() - warning_time) > 4000) jquery15.getJSON(http + '://cs15.livetex.ru/buglog_temp.php?b=' + encodeURIComponent(navigator.userAgent) +
			//													  '&u=[' + encodeURIComponent('[' + document.location.href + ']').split('#').join(''));
		};

		var _postError = function( script, message, stack )
			{

			};


		var versionCheck = function( jq )
		{
			var first = jq.fn.jquery.split('.')[0].toString(),
				second = jq.fn.jquery.split('.')[1].toString(),
				third  = jq.fn.jquery.split('.')[2] ? jq.fn.jquery.split('.')[2].toString() : 0	;

			if (second.length > 1) second = second[0];

			return (jq.fn && +first >= 1 && +second >= 7 && (+second == 7 ? +third >= 2 : true ));
		};

		var _onload = function ()
		{
			window.livetexTestLoadingFSB = 'undef: step = _onload (start)';
			timestamp.step('liveTex test: step 5');
			if (!window.liveTexLabel) {
				setTimeout(_onload, 100);
				return true
			}
			window.livetexTestLoadingFSB = 'undef: step = _onload(after livetexlabel load)';
			if (flag_loaded) {
				return false;
			}
			window.livetexTestLoadingFSB = 'undef: step = _onload(after flag loaded)';
			flag_loaded = true;
			try
			{
				if (window.liveSettings)
				{
					window.livetexTestLoadingFSB = 'undef: step = _onload(we got livesettings)';
					timestamp.step('liveTex test: step 6');
					if (liveSettings.jarl.id)
					{
						window.livetexTestLoadingFSB = 'undef: step = _onload(into label)';
						timestamp.step('liveTex test: step 7');
						_lab = new liveTexLabel(liveSettings.jarl);
						timestamp.step('liveTex test: step 8');
						_auto = new liveTexAutoWelcome(_lab, liveSettings.auto);
						timestamp.step('liveTex test: step 9');
                        if (window.liveSettings.jarl_sound) _soundL = new liveTexSoundLabel(liveSettings.jarl_sound);
                    }
					window.livetexTestLoadingFSB = 'undef: step = _onload(after label)';
					if (window.liveSettings.buttons && window.liveSettings.buttons.length)
						{
						window.livetexTestLoadingFSB = 'undef: step = _onload(into buttons)';
						for (var i=0, l=liveSettings.buttons.length; i<l; i++)
							{
							if (typeof liveSettings.buttons[i] !== 'undefined') new liveTexButton(liveSettings.buttons[i])
							}
						}
					window.livetexTestLoadingFSB = 'undef: step = _onload(after buttons)';
					timestamp.step('liveTex test: step 10');
					jquery15.cookie("livetex_uid", liveSettings.id_session, {
						"path" : "/", "expires" : 14*60*24
					});
					jquery15.cookie("livetex_siteid", liveSettings.id_site, {
						"path" : "/", "expires" : 14*60*24
					});
				}
				window.livetexTestLoadingFSB = '1';
			}
			catch (e)
			{
				if (/BingPreview/.test(navigator.userAgent)) return ;
				_postError('catched_onload', e.message, e.stack);
				window.livetexTestLoadingFSB = 'FSB Except =|'+e.message+'|';
			}


      // Partial API stuff

      (function(){
        var api_get = function() {
          return 'http://' + _server + "/?site_id=" + _site_id +
          "&session_id=" + liveSettings.id_session +
          '&flag_api=true' +
          '&api_version=1.0.0&use_time=' +  _get_livetex_cookie("livetex_time_all") || '0';
        };
        if (window.LiveTex !== undefined) {
          LiveTex.setName = function(name) {
            name = name.replace(/^\s+|\s+$/g, '').replace(/<[^>]*>/g, '');
            if (name.length > 0) {
              jquery15.getJSON(api_get() + '&api_action=setName&api_value='+
                encodeURIComponent(name) +'&callback=?', '', function(){});
            }
          };
          LiveTex.setManyPrechatFields = function(prechats, hidden){
            prechatFields.prechat = prechats;
            prechatFields.hidden = hidden;
          };

          if (LiveTex.onLiveTexReady !== undefined) {
            LiveTex.onLiveTexReady();
          }
        }
      })();


		};
		var ls_preload = function ( data )
		{
			if (data && data.error) { _postError('custom_badrequest', data.error, data.stack); return ;}
			if (!data) {_postError('custom_livetexsimple_empty', httpservLink, {}); return ;}

			window.livetexTestLoadingFSB = 'undef: step = livetex preload(start)';
			//var data = livetexSimple;

			timestamp.step('liveTex test: step 4');
			timestamp.step('4');
			var tempId,
				tempElem,
				buttons = {},
				autos = {},
				request = false;
			window.livetexTestLoadingFSB = 'undef: step = livetex preload(before settings)';
            if (data.button_list == null) data.button_list = [];
            if (data.auto_list == null) data.auto_list = [];
			// Подготавливаем настройки
			for(var i1 = 0, l1 = data.button_list.length; i1 < l1; i1++)
			{
				buttons['id' + data.button_list[i1].local_id] = data.button_list[i1];
			}
			window.livetexTestLoadingFSB = 'undef: step = livetex preload(after buttons)';
			for(var i2 = 0, l2 = data.auto_list.length; i2 < l2; i2++)
			{
				if (data.auto_list[i2].local_id == '-1')
				{
					// Приглашение из пульта оператора
					request = true;
					autos['id1'] = data.auto_list[i2];
				}
				else
				{
					autos['id' + data.auto_list[i2].local_id] = data.auto_list[i2];
				}

			}
			window.livetexTestLoadingFSB = 'undef: step = livetex preload(prepared settings)';
			// Добавляем настройку для приглашения из пульта оператора
			if (request)
			{
				liveSettings.auto.splice(0, 1, // добавить в начало массива 1 элемент
					{
						"id" : 1,
						"settings" : {"no_chat":"true","time_sec_page":"1"},
						"oper" :
						{
							"say" : ""
						},
						"is_active" : false, "is_activated" : false
					}
				);
			}
			window.livetexTestLoadingFSB = 'undef: step = livetex preload(splice label)';
			// Кнопки

			// Обрабатываем настройки
			for(var i3 = 0, l3 = liveSettings.buttons.length; i3 < l3; i3++ )
				{
				// Если кнопки нет, убираем запись
				if (typeof liveSettings.buttons[i3] === 'undefined')
					{
					liveSettings.buttons.splice(i3, 1);
					i3 -=1; l3 -=1;
					continue;
					}
				// Получаем локальный ключ
				tempId = 'id' + liveSettings.buttons[i3].id.split('liveTexButton_').join('');
				tempElem =  buttons[ tempId ];
				
				if (!tempElem)
					{
					// Не приходит элемент с сервера, если неверно записаны в нём пользователь с группой
					//delete liveSettings.buttons[i3];
                    liveSettings.buttons.splice(i3, 1);
					i3 -= 1; l3 -= 1;
					}
				else
					{
					// Ставим настройки
					liveSettings.buttons[i3].name      =   tempElem.member_firstname;
							//+ ' ' +
							//								tempElem.member_lastname;
					liveSettings.buttons[i3].depart    =   tempElem.group_name;
					liveSettings.buttons[i3].foto      =   tempElem.member_photo_url;
					liveSettings.buttons[i3].state     =   !!tempElem.state;
					liveSettings.buttons[i3].no_group  =   data.flag_no_group;
					//Если кнопка войс, то не принимать группу и мемебра от сервера
					if (!liveSettings.buttons[i3].voice){
						liveSettings.buttons[i3].member_id = tempElem.member_id;
						liveSettings.buttons[i3].group_id = tempElem.group_id;
					}

					if (liveSettings.buttons[i3].flag_custom === 1)
						{
						// Оператор онлайн
						if (!!tempElem.state)
							{
							liveSettings.buttons[i3].width = liveSettings.buttons[i3].customSettings.custom_w;
							liveSettings.buttons[i3].height = liveSettings.buttons[i3].customSettings.custom_h;
							liveSettings.buttons[i3].custom_def_w =  liveSettings.buttons[i3].customSettings.custom_w;
							liveSettings.buttons[i3].custom_def_h =  liveSettings.buttons[i3].customSettings.custom_h;
							}
						// Оператор офлайн
						else
							{
							liveSettings.buttons[i3].width = liveSettings.buttons[i3].customSettings.custom_woff;
							liveSettings.buttons[i3].height = liveSettings.buttons[i3].customSettings.custom_hoff;
							liveSettings.buttons[i3].custom_def_w =  liveSettings.buttons[i3].customSettings.custom_woff;
							liveSettings.buttons[i3].custom_def_h =  liveSettings.buttons[i3].customSettings.custom_hoff;
							}
						}
					}
				}

			window.livetexTestLoadingFSB = 'undef: step = livetex preload(set buttons)';
			// Автоприглашения liveSettings.buttons
			for(var i4 = 0, l4 = liveSettings.auto.length; i4 < l4; i4++ )
			{
				// Получаем локальный ключ
				tempId = 'id' + liveSettings.auto[i4].id;
				tempElem =  autos[ tempId ];

				if (!tempElem || !tempElem.state)
				{
					// Не приходит элемент с сервера, если неверно записаны в нём пользователь с группой

					if (!liveSettings.auto[i4].flag_lid || !data.flag_enable_lid) liveSettings.auto[i4] = null;
				}
				else
				{
					// Ставим настройки
					liveSettings.auto[i4].oper.name      =   tempElem.member_firstname + ' ' +
															  tempElem.member_lastname;
					liveSettings.auto[i4].oper.bg        =   tempElem.member_photo_url;
          liveSettings.auto[i4].oper.member_id =   tempElem.member_id;
          liveSettings.auto[i4].oper.group_id =   tempElem.group_id;
					liveSettings.auto[i4].oper.depart    =   tempElem.group_name;
					liveSettings.auto[i4].member_id = tempElem.member_id;
					liveSettings.auto[i4].group_id = tempElem.group_id;

					if (tempId == 'id1')
					{
						liveSettings.auto[i4].oper.say = tempElem.text;
					}
				}
			}
			window.livetexTestLoadingFSB = 'undef: step = livetex preload(set auto)';
			// Удаляем ненужные
			for(var i5 = 0, l5 = liveSettings.auto.length, tempArray = []; i5 < l5; i5++ )
			{
				if (liveSettings.auto[i5] !== null) tempArray.push(liveSettings.auto[i5]);
			}
			window.livetexTestLoadingFSB = 'undef: step = livetex preload(del auto)';
			liveSettings.auto = tempArray;

			// Остальные настройки
			liveSettings.session_part_id    = data.session_id;
			liveSettings.session_part_key   = data.session_key;
			liveSettings.stable             = data.flag_server_stable ? 'stable' : 'unstable';
			liveSettings.id_session         = data.session_id + data.session_key;
			liveSettings.id_site            = _site_id;
			liveSettings.jarl.state         = data.flag_state;
			liveSettings.state              = data.flag_state;
            //TODO заменить на false после выкатала глеба
            liveSettings.lid          = data.flag_enable_lid || false;
			liveSettings.jarl.no_group      = data.flag_no_group;


            //Состояние звукового ярлыка
			if (liveSettings.jarl_sound) liveSettings.jarl_sound.flag_slabel_state = !!data.flag_slabel_state;

     		//локация
      		liveSettings.location = {};
      		liveSettings.location.country_name = data.country_name;

      		liveSettings.location.region_name = data.region_name;
      		liveSettings.location.city_name = data.city_name;
			
			// Загружаем ярлыки и кнопки
			var temp = jquery15.ajaxSettings.cache;
			jquery15.ajaxSettings.cache = true;
            if (http === 'https') port = '';
            var scriptLoad = http + '://' + window.LTX_STATIC_HOST + port +'/js/compiled/from_server_body.min.js';

			scriptSafeLoader( scriptLoad, 'script', _onload, 'fsb' );

			window.livetexTestLoadingFSB = 'FSBLOAD: step = livetex preload(script start loading)';
			window.livetexTestLink = scriptLoad;
			timestamp.step('liveTex test: step 4.1');
			jquery15.ajaxSettings.cache = temp;
		};

		// Загрузка jQuery
		var _jq_onload = function( loaded )
		{
			window.livetexTestLoadingFSB = 'undef: step = jquery onload(start)';
			timestamp.step('liveTex test: step 2');

			// Если скрипт сработал повторно, прекращаем
			if (flag_js_loaded) return false;
			window.livetexTestLoadingFSB = 'undef: step = jquery onload(before version check)';
			// Если есть jQuery и её версия нам не подходит -
			// Перезапрашиваем jQuery повторно с задержкой, она могла не подгрузиться
			if (!window.jQuery || !versionCheck(window.jQuery)) {
				setTimeout(function(){ _jq_onload(loaded); }, 100);
				timestamp.step('liveTex test: step 2.05 - repeat, jQ version is - ' + (window.jQuery ? jQuery.fn.jquery : 'none'));
				return true
			}
			window.livetexTestLoadingFSB = 'undef: step = jquery onload(after version check)';
			// Скрипт запущен - повторные срабатывания будут отсеяны
			flag_js_loaded = true;

			// Если была загружена новая jQuery, разрешаем возможные конфликты
			if (loaded)
			{
				window.livetexTestLoadingFSB = 'undef: step = jquery onload(new loaded version check)';
				window.jquery15 = jQuery.noConflict(true);
			}
			// Если загружена не была, т.е. на сайте есть устраивающая нас версия jQuery
			// Создаём на неё ссылку
			else
			{
				window.livetexTestLoadingFSB = 'undef: step = jquery onload(old version check)';
				window.jquery15 = jQuery;
			}

				/* Supply! */

            //в следующих версиях не будет jquery browser
            if (!window.jquery15.browser){
                // Limit scope pollution from any deprecated API
                (function() {

                    var matched, browser;

// Use of jQuery.browser is frowned upon.
// More details: http://api.jquery.com/jQuery.browser
// jQuery.uaMatch maintained for back-compat
                    jQuery.uaMatch = function( ua ) {
                        ua = ua.toLowerCase();

                        var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
                            /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
                            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
                            /(msie) ([\w.]+)/.exec( ua ) ||
                            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
                            [];

                        return {
                            browser: match[ 1 ] || "",
                            version: match[ 2 ] || "0"
                        };
                    };

                    matched = jQuery.uaMatch( navigator.userAgent );
                    browser = {};

                    if ( matched.browser ) {
                        browser[ matched.browser ] = true;
                        browser.version = matched.version;
                    }

// Chrome is Webkit, but Webkit is also Safari.
                    if ( browser.chrome ) {
                        browser.webkit = true;
                    } else if ( browser.webkit ) {
                        browser.safari = true;
                    }

                    jQuery.browser = browser;

                    jQuery.sub = function() {
                        function jQuerySub( selector, context ) {
                            return new jQuerySub.fn.init( selector, context );
                        }
                        jQuery.extend( true, jQuerySub, this );
                        jQuerySub.superclass = this;
                        jQuerySub.fn = jQuerySub.prototype = this();
                        jQuerySub.fn.constructor = jQuerySub;
                        jQuerySub.sub = this.sub;
                        jQuerySub.fn.init = function init( selector, context ) {
                            if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
                                context = jQuerySub( context );
                            }

                            return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
                        };
                        jQuerySub.fn.init.prototype = jQuerySub.fn;
                        var rootjQuerySub = jQuerySub(document);
                        return jQuerySub;
                    };

                })();
            }

			// jQuery Cookie
			window.jquery15.cookie = function ( name, value, options )
				{
				var expires = ('undefined' !== typeof options && options.expires) ? options.expires : '',
						path = ('undefined' !== typeof options && options.path) ? '; path=' + (options.path) : '',
						domain = ('undefined' !== typeof options && options.domain) ? '; domain=' + (options.domain) : '',
						secure = ('undefined' !== typeof options && options.secure) ? '; secure' : '',

					/* const */
					// Костанты
						_const = {ONE_MINUTE : 60000},

					/* methods */
					// Получить куку
						getCookie = function ( name )
							{
							var cookiesNotEmpty = (document.cookie && 0 < document.cookie.length),
									cookies = cookiesNotEmpty ? document.cookie : null;

							return (null === cookies) ? null : _extractCookieValue( cookies.split( ';' ), name );
							},

						setCookie = function ( name, value, path, expires, domain, secure )
							{
							expires = _formatExpires( expires );
							document.cookie =
							[name, '=', encodeURIComponent( value ), expires, path, domain, secure].join( '' );
							return value;
							},


						delCookie = function ( name, path, domain, secure )
							{
							return setCookie( name, '', path, -1, domain, secure );
							},

					/* supply methods */

						_extractCookieValue = function ( cookieHash, cookieName )
							{
							var cookieCurrentName = null,
									cookie = null,
									cookieValue = null,
									i;

							for ( i = 0; i < cookieHash.length; i++ )
								{
								cookie = jquery15.trim( cookieHash[i] );
								cookieCurrentName = cookie.substring( 0, cookieName.length + 1 );
								if ( cookieCurrentName === cookieName + '=' )
									{
									cookieValue = decodeURIComponent( cookie.substring( cookieName.length + 1 ) );
									break;
									}
								}
							return cookieValue || null;
							},

						_formatExpires = function ( expires )
							{
							var date;

							if ( 'number' === typeof expires )
								{
								date = new Date();
								date.setTime( date.getTime() + (expires * _const.ONE_MINUTE) );
								return '; expires=' + date.toUTCString();
								} else if ( 'undefined' !== typeof expires && expires && expires.toUTCString )
								{
								return '; expires=' + expires.toUTCString();
								}
							else
								{
								return '';
								}
							};

				if ( 'undefined' == typeof value )
					{
					return getCookie( name );
					} else if ( null === value )
					{
					return delCookie( name, path, domain, secure );
					}
				else
					{
					return setCookie( name, value, path, expires, domain, secure );
					}
				};
			timestamp.step('liveTex test: step 2.1');

			// Составляем путь
			var newSite;
			if ((site_id+"").length < 3) newSite = '0' + (site_id+"");
			else newSite = site_id;
			var startSite = (newSite+"").length - 3,
					path  = [ 'js/settings/',
						 	  (newSite+"").substr( startSite, 1 )+"", '/',
					 		  (newSite+"").substr( startSite + 1, 1 ), '/',
							  (newSite+"").substr( startSite + 2, 1 ), '/',
							newSite, '.js?r=', Math.floor(Math.random() * 10000)
						    ].join('');
			window.livetexTestLoadingFSB = 'undef: step = jquery onload(path)';
			// Загружаем его
            if (http === 'https') port = '';
			var url = http + '://' + window.LTX_CS_HOST + port +'/' + path;
			window.livetexTestLoadingFSB = 'undef: step = jquery onload(before load script)';

			scriptSafeLoader( url, 'script', _settings_onload, 'settings');

			window.livetexTestLoadingFSB = 'SETTINGS: step = jquery onload(after load script)';
			window.livetexTestLink = url;

		};

		// Загрузка балансера после загрузки настроек
		var _settings_onload = function ()
		{
			var balancer =  [ http, '://',
			                  window.livetexBalancer || 'lb3.livetex.ru', '/',
			                  '?sender=client&action=getserver&flag_ssl=',
                        String(location.protocol === 'https:') ].join('');

			_balancer_cached_load(balancer);

			window.livetexTestLoadingFSB = 'BALANCER: step = settings onload ver2(after start balancer loading ['+balancer+'])';
		};

		//кеширование настрое балансера в куках
		var _balancer_cached_load = function(balancer){
			var data = _get_livetex_cookie('livetex_balancer');
			if (data != null && window.JSON !== undefined && window.JSON.parse !== undefined){
				data = JSON.parse(data);
				if (data.result_info && data.result_info === 'ok'){
					_balancer_onload(data);
					return;
				}
			}
			scriptSafeLoader( balancer, 'jsonp', _balancer_onload, 'balancer' );
		};

		// Загрузка http сервера
		var _balancer_onload = function (data, dontSaveBalancer)
		{
			if (!dontSaveBalancer && data.result_info && data.result_info === 'ok' && window.JSON !== undefined && window.JSON.stringify !== undefined){
				jquery15.cookie("livetex_balancer", JSON.stringify(data) , {"path" : "/", "expires" : 5 /* 5 минут*/});
			}
			window.livetexTestLoadingFSB = 'undef: step = balancer onload(start)';
			timestamp.step('liveTex test: step 3');
			
			_session_id = _get_livetex_cookie("livetex_uid") || null;
			var use_time = _get_livetex_cookie("livetex_time_all") || '0';
            use_pages = +_get_livetex_cookie("livetex_countpage");
            use_visits = +_get_livetex_cookie("livetex_visit");
            if(use_pages === 0 || use_visits === 0) // апдейтим визит
            {
                use_visits += 1;
            }
            use_pages +=1;


			//jquery15.cookie("livetex_visit", use_visits , {"path" : "/", "expires" : 14*60*24 /* 2 недели*/});
		    //jquery15.cookie("livetex_countpage", use_pages , {"path" : "/", "expires" : 2 /* 2 минуты*/});

			var title = jquery15("title").text().substring(0, 1024) || "null";
			var serv = _server = data.server;
			var nocache = new Date();
			nocache = nocache.getTime();
			var get_string = "/?site_id=" + site_id + "&session_id=" + _session_id;
			var refererObj = refererFunc(),
				refererString  = refererObj ? ('&seo_type=true&seo_engine=' + refererObj.engine + '&seo_q=' + base64.encode(refererObj.query)) : '&seo_type=false',
				additional = (window.livetexAdditional) ? ('&additional=' + encodeURIComponent(livetexAdditional) ) : '';
			window.livetexTestLoadingFSB = 'undef: step = balancer onload(after vars)';

			var realReferrer = (refererObj && refererObj.realReferrer != '') ? refererObj.realReferrer : document.referrer;

			get_string += "&referer=" + (realReferrer ? base64.encode(realReferrer) : "null") +
						  "&url=" + base64.encode(document.location.href) +
						  additional +
						  "&use_time=" + use_time +
                          "&use_visits=" + use_visits +
                          "&use_pages=" + use_pages +
                          "&title=" + base64.encode(title) + "&nocache=" + nocache + refererString +
						  "&flag_simple=true&settings=" + _getSettings();

			window.livetexTestLoadingFSB = 'undef: step = balancer onload(after getstring)';

            if (http === 'https') serv = serv.split(':80').join('');
		    get_string = http + '://' + serv + get_string;
			window.livetexTestLoadingFSB = 'undef: step = balancer onload(after serv split)';
			httpservLink = get_string;

			scriptSafeLoader( get_string, 'jsonp', ls_preload, 'http' );

			window.livetexTestLoadingFSB = 'undef: step = balancer onload(after script load)';
			timestamp.step('liveTex test: step 3.1');
			warning_time = timestamp.check();
			window.livetexTestLoadingFSB = 'HTTP: step = balancer onload(after step check)';
			window.livetexTestLink = get_string;
		};

		// Формирование настроек
		var _getSettings = function()
		{
			if (!window.liveSettings) {_postError('custom_liveSettings_empty', 'Empty liveSettings', {}); return ;}
			window.livetexTestLoadingFSB = 'undef: step = getsettings onload (start)';

			var buttons = "", autos = "", settings;
			// Формирование кнопок
			for( var i1 = 0, l1 = liveSettings.buttons.length; i1 < l1; i1++ )
			{
				window.livetexTestLoadingFSB = 'undef: step = getsettings onload (in buttons)';
				if (buttons) buttons += '-';
				buttons += [ liveSettings.buttons[i1].id.split('liveTexButton_').join(''),
							 liveSettings.buttons[i1].member_id,
							 liveSettings.buttons[i1].group_id,
                             liveSettings.buttons[i1].voice].join('.');
			}
			window.livetexTestLoadingFSB = 'undef: step = getsettings onload (after buttons)';
			// Формирование автоприглашений
			for( var i2 = 0, l2 = liveSettings.auto.length; i2 < l2; i2++ )
			{
				window.livetexTestLoadingFSB = 'undef: step = getsettings onload (in auto)';
				if (autos) autos += '-';
				autos += [ liveSettings.auto[i2].id,
						   liveSettings.auto[i2].member_id,
						   liveSettings.auto[i2].group_id].join('.');
			}
			window.livetexTestLoadingFSB = 'undef: step = getsettings onload (after auto)';
			settings = '(' + buttons + ')(' + autos + ')';
			return settings;

		};

		var _get_livetex_cookie = function (name)
		{
			window.livetexTestLoadingFSB = 'undef: step = begin cookie (start)';
			var cookieValue = null;
			if (document.cookie && document.cookie != '')
			{
				var cookies = document.cookie.split(';');
				for (var i = 0; i < cookies.length; i++)
				{
					var cookie = String.prototype.trim ? (cookies[i] == null ? "" : cookies[i].trim()) : (cookies[i] == null ? "" : cookies[i].toString().replace(/^\s+/,
					"").replace(/\s+$/, ""));
					if (cookie.substring(0, name.length + 1) == (name + '=')) {
						cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
						break
					}
				}
			}
			window.livetexTestLoadingFSB = 'undef: step = begin cookie (finish cookie)';
			return cookieValue;
		};
		var _create_script = function (link, callback)
		{
			window.livetexTestLoadingFSB = 'undef: step = begin create script (start)';
			window.livetexTestLoadingFSB = 'undef: step = create script';
			var headID = document.getElementsByTagName("head")[0];
			var newScript = document.createElement('script');
			newScript.type = 'text/javascript';
			newScript.src = link;
			newScript.onload = newScript.onreadystatechange = callback;
			headID.appendChild(newScript);
			window.livetexTestLoadingFSB = 'undef: step = begin cookie (finish script)';
		};
		// Определение поисковика и запроса
		var refererFunc = function ()
		{
			window.livetexTestLoadingFSB = 'undef: step = referer script(start)';
			var engines =
			[
				{start:'http://www.google.', query:'q', name:'google'},
				{start:'http://yandex.', query:'text', name:'yandex'},
				{start:'rambler.ru/search', query:'query', name:'rambler'},
				{start:'http://go.mail.ru/', query:'q', name:'mailru'},
				{start:'http://www.bing.com/', query:'q', name:'bing'},
				{start:'search.yahoo.com/search', query:'p', name:'yahoo'},
				{start:'http://ru.ask.com/', query:'q', name:'ask'},
				{start:'http://search.qip.ru/search', query:'query', name:'qip'}
			],

			ref=document.referrer, req="",engine="", start, cp1251;		
			window.livetexTestLoadingFSB = 'undef: step = referer script(after engines)';
			for (var i in engines){
				if  (!engines.hasOwnProperty(i))
					continue;
				if (ref.indexOf(engines[i].start)==-1)
					continue;
				start = ref.indexOf('?' + engines[i].query + '=');
				if (start == -1){
					start = ref.indexOf('&' + engines[i].query + '=');
					if (start == -1)
						return false;
				}
				engine = engines[i].name;
				req = engines[i].query;
				cp1251 = engines[i].hasOwnProperty('cp1251');
			}
			window.livetexTestLoadingFSB = 'undef: step = referer script(after for)';
			if (!engine)
				return false;
			ref = ref.substr(start + req.length + 2);
			var end = ref.indexOf('&');
			window.livetexTestLoadingFSB = 'undef: step = referer script(after indexof)';
			if (end != -1)
					ref = ref.substr(0, end);
			if (cp1251){
				window.livetexTestLoadingFSB = 'undef: step = referer script(before 1251)';
				function win2unicode(str) {
					var charmap   = unescape(
					"%u0402%u0403%u201A%u0453%u201E%u2026%u2020%u2021%u20AC%u2030%u0409%u2039%u040A%u040C%u040B%u040F"+
					"%u0452%u2018%u2019%u201C%u201D%u2022%u2013%u2014%u0000%u2122%u0459%u203A%u045A%u045C%u045B%u045F"+
					"%u00A0%u040E%u045E%u0408%u00A4%u0490%u00A6%u00A7%u0401%u00A9%u0404%u00AB%u00AC%u00AD%u00AE%u0407"+
					"%u00B0%u00B1%u0406%u0456%u0491%u00B5%u00B6%u00B7%u0451%u2116%u0454%u00BB%u0458%u0405%u0455%u0457");
					var code2char = function(code) {
					   if(code >= 0xC0 && code <= 0xFF) return String.fromCharCode(code - 0xC0 + 0x0410);
					   if(code >= 0x80 && code <= 0xBF) return charmap.charAt(code - 0x80);
					   return String.fromCharCode(code);
					};
					var res = "";
					for(var i = 0; i < str.length; i++) res = res + code2char(str.charCodeAt(i));
					return res;
				}
				ref = unescape(ref);
				ref = win2unicode(ref);
			}else
				ref = decodeURIComponent(ref);
			window.livetexTestLoadingFSB = 'undef: step = referer script(afer 1251)';
			ref = ref.replace(/[+]+/g, ' ');
			window.livetexTestLoadingFSB = 'undef: step = referer script(afer reg)';

			//если это гугл, то получаем реальный реферер
			var realReferrer = '';
			if (engine === 'google'){
				var pattern = /&q=(.+?)&/;

				if (pattern.test(document.referrer)){
					var res = pattern.exec(document.referrer);
					realReferrer = 'http://google.com/search?q=' + res[1];
				}

			}
			return {"engine": engine, "query": ref, "realReferrer" : realReferrer};
		};

		timestamp.step('liveTex test: step 1');
		if (!window.jQuery || !versionCheck(window.jQuery))
		{
			window.livetexTestLoadingFSB = 'undef: step = loading jq 1.7.2';
			timestamp.step('liveTex test: step 1.1');
			_create_script(http + "://" + window.LTX_STATIC_HOST + port +"/js/jquery-1.7.2.min.js", function()
				{
					timestamp.step('liveTex test: step 1.1.1');
					_jq_onload(true)
				});
			timestamp.step('liveTex test: step 1.1.0');
		}
		else {
			window.livetexTestLoadingFSB = 'undef: step = NOT loading jq 1.7.2';
			timestamp.step('liveTex test: step 1.2');
			_jq_onload(false);
			timestamp.step('liveTex test: step 1.2.0');
		}
		return {
      prechatFields : prechatFields,
            scriptSafeLoader : scriptSafeLoader,
			label : function ()
			{
				return _lab;
			},
			auto_welcome : function ()
			{
				return _auto;
			},
			site_id : function ()
			{
				return _site_id;
			},
			getServer : function()
			{
				return _server;
			},
			getStatus : function()
			{
				return  (window.liveSettings) ? liveSettings.state : false;
			},
			hideLabel : function()
			{
				if (window.jquery15)
					{
					jquery15( '#content_' + liveSettings.jarl.id ).hide();
					}
			},
            showLabel : function()
            {
               // alert( '#' + liveSettings.jarl.id);
                if( window.liveSettings && liveSettings.jarl && liveSettings.jarl.flag_hide_offline && !liveSettings.jarl.state)
                {
                    return ;
                }

                if (window.jquery15 )
                {
                    //alert( '2' );
                    jquery15( '#' + liveSettings.jarl.id ).show();
                }
            }
		}
	};
	if (window.liveTex_object === true)
	{
		window.livetexTestLoadingFSB = 'undef: step = livetex start create';
		try
			{
			liveTex_object=new liveTex(liveTexID);
			}
		catch(e)
			{

			}
		window.ltAPI = liveTex_object;
		window.livetexTestLoadingFSB = 'undef: step = livetex create';
	}
}
else
{
	window.livetexTestLoadingFSB = 'undef: step = bad site settings';
}
