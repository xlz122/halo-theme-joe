/* 获取直属子元素 */
function getChildren(el, className) {
	for (let item of el.children) if (item.className === className) return item;
	return null;
}

document.addEventListener('DOMContentLoaded', () => {
	$('.joe_detail__article p:empty').remove();

	customElements.define(
		'joe-callout',
		class JoeCallout extends HTMLElement {
			constructor() {
				super();
				const _temp = getChildren(this, '_temp');
				this.options = {
					color: this.getAttribute('color') || '#f0ad4e',
					content: this.getAttribute('content') || '标注内容'
				};

				const htmlStr = `
					<div class="joe_callout" style="border-left-color: ${this.options.color};">
						${this.options.content}
					</div>
				`;

				if (getChildren(this, '_content')) {
					getChildren(this, '_content').innerHTML = htmlStr;
				} else {
					const span = document.createElement('span');
					span.style.display = 'block';
					span.className = '_content';
					span.innerHTML = htmlStr;
					this.appendChild(span);
				}
			}
		}
	);

	customElements.define(
		'joe-title',
		class JoeTitle extends HTMLElement {
			constructor() {
				super();
				this.innerHTML = `
					<span class="joe_title">
						<span class="joe_title__text">
							${this.getAttribute('title') || '默认标题'}
						</span>
					</span>
				`;
			}
		}
	);

	customElements.define(
		'joe-btn',
		class JoeBtn extends HTMLElement {
			constructor() {
				super();
				this.options = {
					icon: this.getAttribute('icon') || '',
					color: this.getAttribute('color') || '#ff6800',
					href: this.getAttribute('href') || '#',
					content: this.getAttribute('content') || '多彩按钮',
					radius: this.getAttribute('radius') || '17.5px'
				};

				this.innerHTML = `
          <a
						class="joe_btn"
						href="${this.options.href}"
						target="_blank"
						rel="noopener noreferrer nofollow"
						style="background: ${this.options.color}; border-radius: ${this.options.radius}"
					>
            <span class="joe_btn__icon">
              <i class="${this.options.icon}"></i>
            </span>
            <span class="joe_btn__content">
              ${this.options.content}
            </span>
          </a>
        `;
			}
		}
	);

	// 暂不支持, 缺少js
	customElements.define(
		'joe-copy',
		class JoeCopy extends HTMLElement {
			constructor() {
				super();
				this.options = {
					title: this.getAttribute('title') || '点击复制',
					content: this.getAttribute('content') || '默认文本',
					color: this.getAttribute('color') || 'inherit',
					bold: this.getAttribute('bold') != null ? 'bold' : 'normal'
				};

				this.innerHTML = `
					<span
						class="joe_copy"
						style="cursor: pointer; user-select: none;font-weight: ${this.options.bold};color: ${this.options.color};"
					>
						${this.options.title}
					</span>
				`;

				const button = getChildren(this, 'joe_copy');
				if (typeof ClipboardJS !== 'undefined' && typeof Qmsg !== 'undefined') {
					new ClipboardJS(button, { text: () => this.options.content }).on(
						'success',
						() => Qmsg.success('复制成功！')
					);
				} else {
					button.addEventListener('click', () =>
						alert('该功能请前往前台查看！')
					);
				}
			}
		}
	);

	customElements.define(
		'joe-note',
		class JoeNote extends HTMLElement {
			constructor() {
				super();
				this.options = {
					icon: this.getAttribute('icon') || '',
					type: /^secondary$|^success$|^warning$|^error$|^info$/.test(
						this.getAttribute('type')
					)
						? this.getAttribute('type')
						: 'secondary',
					content: this.getAttribute('content') || '标签按钮',
					href: this.getAttribute('href') || '#'
				};

				this.innerHTML = `
					<a
						class="joe_note ${this.options.type}"
						href="${this.options.href}"
						target="_blank"
						rel="noopener noreferrer nofollow"
					>
						<span class="joe_note__icon">
							<i class="${this.options.icon}"></i>
						</span>
						<span class="joe_note__content">
							${this.options.content}
						</span>
					</a>
				`;
			}
		}
	);

	customElements.define(
		'joe-message',
		class JoeMessage extends HTMLElement {
			constructor() {
				super();
				this.options = {
					type: /^info$|^success$|^warning$|^error$/.test(
						this.getAttribute('type')
					)
						? this.getAttribute('type')
						: 'info',
					content: this.getAttribute('content') || '消息内容'
				};

				this.innerHTML = `
					<span class="joe_message ${this.options.type}">
						<span class="joe_message__icon"></span>
						<span class="joe_message__content">${this.options.content}</span>
					</span>
				`;
			}
		}
	);

	customElements.define(
		'joe-alert',
		class JoeAlert extends HTMLElement {
			constructor() {
				super();
				const _temp = getChildren(this, '_temp');
				this.options = {
					type: /^info$|^success$|^warning$|^error$/.test(
						this.getAttribute('type')
					)
						? this.getAttribute('type')
						: 'info',
					content: this.getAttribute('content') || '提示内容',
				};

				const htmlStr = `
					<div class="joe_alert ${this.options.type}">
						${this.options.content}
					</div>
				`;

				if (getChildren(this, '_content')) {
					getChildren(this, '_content').innerHTML = htmlStr;
				} else {
					const span = document.createElement('span');
					span.style.display = 'block';
					span.className = '_content';
					span.innerHTML = htmlStr;
					this.appendChild(span);
				}
			}
		}
	);

	// 彩色虚线
	customElements.define(
		'joe-dotted',
		class JoeDotted extends HTMLElement {
			constructor() {
				super();
				this.startColor = this.getAttribute('startColor') || '#ff6c6c';
				this.endColor = this.getAttribute('endColor') || '#1989fa';

				this.innerHTML = `
					<span
						class="joe_dotted"
						style="background-image: repeating-linear-gradient(-45deg, ${this.startColor} 0, ${this.startColor} 20%, transparent 0, transparent 25%, ${this.endColor} 0, ${this.endColor} 45%, transparent 0, transparent 50%)"
					></span>
				`;
			}
		}
	);

	customElements.define(
		'joe-progress',
		class JoeProgress extends HTMLElement {
			constructor() {
				super();
				this.options = {
					percentage: /^\d{1,3}%$/.test(this.getAttribute('percentage'))
						? this.getAttribute('percentage')
						: '50%',
					color: this.getAttribute('color') || '#ff6c6c'
				};

				this.innerHTML = `
					<span class="joe_progress">
						<div class="joe_progress__strip">
							<div
								class="joe_progress__strip-percent"
								style="width: ${this.options.percentage}; background: ${this.options.color};"
							></div>
						</div>
						<div class="joe_progress__percentage">${this.options.percentage}</div>
					</span>
				`;
			}
		}
	);

	customElements.define(
		'joe-card-default',
		class JoeCardDefault extends HTMLElement {
			constructor() {
				super();
				const _temp = getChildren(this, '_temp');
				this.options = {
					width: this.getAttribute('width') || '100%',
					title: this.getAttribute('title') || '卡片标题',
					content:
						_temp?.innerHTML?.trim()?.replace(/^(<br>)|(<br>)$/g, '') ||
						'卡片内容'
				};

				const htmlStr = `
					<div class="joe_card__default" style="width: ${this.options.width}">
						<div class="joe_card__default-title">${this.options.title}</div>
						<div class="joe_card__default-content">${this.options.content}</div>
					</div>
				`;

				if (getChildren(this, '_content')) {
					getChildren(this, '_content').innerHTML = htmlStr;
				} else {
					const span = document.createElement('span');
					span.style.display = 'block';
					span.className = '_content';
					span.innerHTML = htmlStr;
					this.appendChild(span);
				}
			}
		}
	);

	customElements.define(
		'joe-card-describe',
		class JoeCardDescribe extends HTMLElement {
			constructor() {
				super();
				const _temp = getChildren(this, '_temp');
				this.options = {
					title: this.getAttribute('title') || '卡片标题',
					content:
						_temp?.innerHTML?.trim()?.replace(/^(<br>)|(<br>)$/g, '') ||
						'卡片内容'
				};

				const htmlStr = `
					<div class="joe_card__describe">
						<div class="joe_card__describe-title">${this.options.title}</div>
						<div class="joe_card__describe-content">${this.options.content}</div>
					</div>
				`;

				if (getChildren(this, '_content')) {
					getChildren(this, '_content').innerHTML = htmlStr;
				} else {
					const span = document.createElement('span');
					span.style.display = 'block';
					span.className = '_content';
					span.innerHTML = htmlStr;
					this.appendChild(span);
				}
			}
		}
	);

	customElements.define(
		'joe-cloud',
		class JoeCloud extends HTMLElement {
			constructor() {
				super();
				this.options = {
					type: this.getAttribute('type') || 'default',
					title: this.getAttribute('title') || '默认标题',
					url: this.getAttribute('url'),
					password: this.getAttribute('password')
				};

				const type = {
					default: '默认网盘',
					360: '360网盘',
					bd: '百度网盘',
					ty: '天翼网盘',
					ct: '城通网盘',
					wy: '微云网盘',
					github: 'Github仓库',
					gitee: 'Gitee仓库',
					lz: '蓝奏云网盘'
				};

				this.innerHTML = `
					<span class="joe_cloud">
						<div class="joe_cloud__logo _${this.options.type}"></div>
						<div class="joe_cloud__describe">
							<div class="joe_cloud__describe-title">${this.options.title}</div>
							<div class="joe_cloud__describe-type">
								来源：${type[this.options.type] || '默认网盘'}
								${this.options.password ? ' | 提取码：' + this.options.password : ''}
							</div>
						</div>
						<a
							class="joe_cloud__btn"
							href="${this.options.url}"
							target="_blank"
							rel="noopener noreferrer nofollow"
						>
							<i class="joe-font joe-icon-fasong"></i>
						</a>
					</span>
				`;
			}
		}
	);

	// 暂不支持, 缺少js
	customElements.define(
		'joe-pdf',
		class JoePdf extends HTMLElement {
			constructor() {
				super();
				this.options = {
					src: this.getAttribute('src') || '',
					width: this.getAttribute('width') || '100%',
					height: this.getAttribute('height') || '500px'
				};
				this.render();
			}

			render() {
				if (!this.options.src) {
					return this.innerHTML = 'pdf地址未填写!';
				}

				this.innerHTML = `
					<div class="joe_pdf">
						<iframe
							src="${ThemeConfig.BASE_RES_URL}/source/lib/pdfjs/web/viewer.html?file=${this.options.src}"
							style="width:${this.options.width};height:${this.options.height}"
						></iframe>
					</div>
				`;
			}
		}
	);

	customElements.define(
		'joe-mp3',
		class JoeMp3 extends HTMLElement {
			constructor() {
				super();
				this.options = {
					url: this.getAttribute('url'),
					name: this.getAttribute('name'),
					cover: this.getAttribute('cover') || '',
					autoplay: this.getAttribute('autoplay') ? true : false,
					theme: this.getAttribute('theme') || '#1989fa'
				};
				this.render();
			}

			render() {
				if (!this.options.url) {
					return this.innerHTML = '音频地址未填写!';
				}

				this.innerHTML = "<span style=\"display: block\" class=\"_content\"></span>";
				new APlayer({
					container: getChildren(this, '_content'),
					theme: this.options.theme,
					autoplay: this.options.autoplay,
					audio: [
						{
							url: this.options.url,
							name: this.options.name,
							cover: this.options.cover
						}
					]
				});
			}
		}
	);

	customElements.define(
		'joe-music',
		class JoeMusic extends HTMLElement {
			constructor() {
				super();
				this.options = {
					id: this.getAttribute('id'),
					color: this.getAttribute('color') || '#1989fa',
					autoplay: this.getAttribute('autoplay') && this.getAttribute('autoplay') === 'true' ? true : false
				};
				this.render();
			}

			render() {
				if (!this.options.id) {
					return this.innerHTML = '网易云歌曲ID未填写!';
				}

				this.innerHTML = "<span style=\"display: block\" class=\"_content\"></span>";
				fetch(
					'https://www.vvhan.com/usr/themes/Joe/NeteaseCloudMusicApi.php?id=' +
					this.options.id
				).then(async (response) => {
					const audio = await response.json();
					new APlayer({
						container: getChildren(this, '_content'),
						lrcType: 1,
						theme: this.options.color,
						autoplay: this.options.autoplay,
						audio
					});
				});
			}
		}
	);

	customElements.define(
		'joe-music-list',
		class JoeMusicList extends HTMLElement {
			constructor() {
				super();
				this.options = {
					id: this.getAttribute('id'),
					color: this.getAttribute('color') || '#1989fa',
					autoplay: this.getAttribute('autoplay') && this.getAttribute('autoplay') === 'true' ? true : false
				};
				this.render();
			}

			render() {
				if (!this.options.id) {
					return this.innerHTML = '网易云歌单ID未填写!';
				}

				this.innerHTML = "<span style=\"display: block\" class=\"_content\"></span>";
				fetch(
					'https://api.i-meto.com/meting/api?server=netease&type=playlist&id=' +
					this.options.id
				).then(async (response) => {
					const audio = await response.json();
					new APlayer({
						container: getChildren(this, '_content'),
						lrcType: 3,
						theme: this.options.color,
						autoplay: this.options.autoplay,
						audio
					});
				});
			}
		}
	);

	customElements.define(
		'joe-dplayer',
		class JoeDplayer extends HTMLElement {
			constructor() {
				super();
				this.options = {
					src: this.getAttribute('src') || '',
					width: this.getAttribute('width') || '100%',
					height: this.getAttribute('height') || '500px',
					player:
						this.getAttribute('player') ||
						`/themes/Halo-Theme-Joe3/assets/lib/dplayer/web/dplayer.html?url=`,
				};
				this.render();
			}

			render() {
				if (!this.options.src) {
					return this.innerHTML = '视频地址未填写!';
				}

				this.innerHTML = `
					<iframe
						class="joe_vplayer"
						src="${this.options.player + this.options.src}"
						style="width:${this.options.width};height:${this.options.height}"
						allowfullscreen="true"
					></iframe>
				`;
			}
		}
	);

	customElements.define(
		'joe-bilibili',
		class JoeBilibili extends HTMLElement {
			constructor() {
				super();
				this.options = {
					bvid: this.getAttribute('bvid'),
					page: +(this.getAttribute('page') || '1'),
					width: this.getAttribute('width') || '100%',
					height: this.getAttribute('height') || '500px',
				};
				this.render();
			}

			render() {
				if (!this.options.bvid) {
					return this.innerHTML = 'bvid未填写!';
				}

				this.innerHTML = `
					<iframe
						class="joe_vplayer"
						src="//player.bilibili.com/player.html?bvid=${this.options.bvid}&page=${this.options.page}"
						style="width:${this.options.width};height:${this.options.height}"
						allowfullscreen="true"
					></iframe>
				`;
			}
		}
	);

	// 不支持默认、StackEdit编辑器，支持ByteMD编辑器
	customElements.define(
		'joe-card-list',
		class JoeCardList extends HTMLElement {
			constructor() {
				super();
				const _temp = getChildren(this, '_temp');
				let _innerHTML = _temp?.innerHTML?.trim()?.replace(/^(<br>)|(<br>)$/g, '');
				let content = '';
				_innerHTML.replace(
					/{card-list-item}([\s\S]*?){\/card-list-item}/g,
					function ($0, $1) {
						content += `
							<div class="joe_card__list-item">
								${$1.trim().replace(/^(<br>)|(<br>)$/g, '')}
							</div>
						`;
					}
				);

				let htmlStr = `<div class="joe_card__list">${content}</div>`;
				if (getChildren(this, '_content')) {
					getChildren(this, '_content').innerHTML = htmlStr;
				} else {
					const span = document.createElement('span');
					span.className = '_content';
					span.style.display = 'block';
					span.innerHTML = htmlStr;
					this.appendChild(span);
				}
			}
		}
	);

	// 不支持默认、StackEdit编辑器，支持ByteMD编辑器
	customElements.define(
		'joe-tabs',
		class JoeTabs extends HTMLElement {
			constructor() {
				super();
				const _temp = getChildren(this, '_temp');
				let _innerHTML = _temp.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, '');
				let navs = '';
				let contents = '';
				_innerHTML.replace(
					/{tabs-pane([^}]*)}([\s\S]*?){\/tabs-pane}/g,
					function ($0, $1, $2) {
						navs += `<div class="joe_tabs__head-item" label="${$1}"></div>`;
						contents += `
							<div style="display: none" class="joe_tabs__body-item" label="${$1}">
								${$2.trim().replace(/^(<br>)|(<br>)$/g, '')}
							</div>
						`;
					}
				);
				let htmlStr = `
          <div class="joe_tabs">
            <div class="joe_tabs__head">${navs}</div>
            <div class="joe_tabs__body">${contents}</div>
          </div>
        `;

				if (getChildren(this, '_content')) {
					getChildren(this, '_content').innerHTML = htmlStr;
				} else {
					const span = document.createElement('span');
					span.className = '_content';
					span.style.display = 'block';
					span.innerHTML = htmlStr;
					this.appendChild(span);
				}

				this.querySelectorAll('.joe_tabs__head-item').forEach((item, index) => {
					const label = item.getAttribute('label');
					item.innerHTML = label;
					item.addEventListener('click', (e) => {
						e.stopPropagation();
						this.querySelectorAll('.joe_tabs__head-item').forEach((_item) =>
							_item.classList.remove('active')
						);
						this.querySelectorAll('.joe_tabs__body-item').forEach(
							(_item) => (_item.style.display = 'none')
						);
						if (this.querySelector(`.joe_tabs__body-item[label="${label}"]`)) {
							this.querySelector(
								`.joe_tabs__body-item[label="${label}"]`
							).style.display = "block";
						}
						item.classList.add("active");
					});
					if (index === 0) item.click();
				});

				_temp.parentNode.removeChild(_temp); // 清理无用标签
			}
		}
	);

	// 不支持默认、StackEdit编辑器，支持ByteMD编辑器
	customElements.define(
		'joe-timeline',
		class JoeTimeline extends HTMLElement {
			constructor() {
				super();
				const _temp = getChildren(this, '_temp');
				let _innerHTML = _temp.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, '');
				let content = '';
				_innerHTML.replace(
					/{timeline-item([^}]*)}([\s\S]*?){\/timeline-item}/g,
					function ($0, $1, $2) {
						content += `
							<div class="joe_timeline__item">
								<div class="joe_timeline__item-tail"></div>
								<div class="joe_timeline__item-circle" ${$1}></div>
								<div class="joe_timeline__item-content">
									${$2.trim().replace(/^(<br>)|(<br>)$/g, '')}
								</div>
							</div>
						`;
					}
				);

				let htmlStr = `<div class="joe_timeline">${content}</div>`;
				if (getChildren(this, '_content')) {
					getChildren(this, '_content').innerHTML = htmlStr;
				} else {
					const span = document.createElement('span');
					span.className = '_content';
					span.style.display = 'block';
					span.innerHTML = htmlStr;
					this.appendChild(span);
				}

				this.querySelectorAll('.joe_timeline__item-circle').forEach(
					(item, index) => {
						const color = item.getAttribute('color') || '#19be6b';
						item.style.borderColor = color;
					}
				);

				_temp.parentNode.removeChild(_temp);
			}
		}
	);

	$(".joe_detail__article p:empty").remove();
});
