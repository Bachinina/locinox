/*!
 * parallax.js v1.3 (http://pixelcog.github.io/parallax.js/)
 * @copyright 2015 PixelCog, Inc.
 * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
 */
! function (t, i, e, s) {
	function o(i, e) {
		var h = this;
		"object" == typeof e && (delete e.refresh, delete e.render, t.extend(this, e)), this.$element = t(i), !this.imageSrc && this.$element.is("img") && (this.imageSrc = this.$element.attr("src"));
		var n = (this.position + "").toLowerCase().match(/\S+/g) || [];
		return n.length < 1 && n.push("center"), 1 == n.length && n.push(n[0]), "top" == n[0] || "bottom" == n[0] || "left" == n[1] || "right" == n[1] ? (h.positionX = n[1], h.positionY = n[0]) : (h.positionX = n[0], h.positionY = n[1]), this.positionX != s && (n[0] = this.positionX.toLowerCase()), this.positionY != s && (n[1] = this.positionY.toLowerCase()), "left" != this.positionX && "right" != this.positionX && (this.positionX = isNaN(parseInt(this.positionX)) ? "center" : parseInt(this.positionX)), "top" != this.positionY && "bottom" != this.positionY && (this.positionY = isNaN(parseInt(this.positionY)) ? "center" : parseInt(this.positionY)), this.position = this.positionX + (isNaN(this.positionX) ? "" : "px") + " " + this.positionY + (isNaN(this.positionY) ? "" : "px"), navigator.userAgent.match(/(iPod|iPhone|iPad)/) ? (this.iosFix && !this.$element.is("img") && this.$element.css({
			backgroundImage: "url(" + this.imageSrc + ")",
			backgroundSize: "cover",
			backgroundPosition: this.position
		}), this) : navigator.userAgent.match(/(Android)/) ? (this.androidFix && !this.$element.is("img") && this.$element.css({
			backgroundImage: "url(" + this.imageSrc + ")",
			backgroundSize: "cover",
			backgroundPosition: this.position
		}), this) : (this.$mirror = t("<div />").prependTo("body"), this.$slider = t("<img />").prependTo(this.$mirror), this.$mirror.addClass("parallax-mirror").css({
			visibility: "hidden",
			zIndex: this.zIndex,
			position: "fixed",
			top: 0,
			left: 0,
			overflow: "hidden"
		}), this.$slider.addClass("parallax-slider").one("load", function () {
			h.naturalHeight && h.naturalWidth || (h.naturalHeight = this.naturalHeight || this.height || 1, h.naturalWidth = this.naturalWidth || this.width || 1), h.aspectRatio = h.naturalWidth / h.naturalHeight, o.isSetup || o.setup(), o.sliders.push(h), o.isFresh = !1, o.requestRender()
		}), this.$slider[0].src = this.imageSrc, void((this.naturalHeight && this.naturalWidth || this.$slider[0].complete) && this.$slider.trigger("load")))
	}

	function h(s) {
		return this.each(function () {
			var h = t(this),
				n = "object" == typeof s && s;
			this == i || this == e || h.is("body") ? o.configure(n) : h.data("px.parallax") || (n = t.extend({}, h.data(), n), h.data("px.parallax", new o(this, n))), "string" == typeof s && o[s]()
		})
	}! function () {
		for (var t = 0, e = ["ms", "moz", "webkit", "o"], s = 0; s < e.length && !i.requestAnimationFrame; ++s) i.requestAnimationFrame = i[e[s] + "RequestAnimationFrame"], i.cancelAnimationFrame = i[e[s] + "CancelAnimationFrame"] || i[e[s] + "CancelRequestAnimationFrame"];
		i.requestAnimationFrame || (i.requestAnimationFrame = function (e) {
			var s = (new Date).getTime(),
				o = Math.max(0, 16 - (s - t)),
				h = i.setTimeout(function () {
					e(s + o)
				}, o);
			return t = s + o, h
		}), i.cancelAnimationFrame || (i.cancelAnimationFrame = function (t) {
			clearTimeout(t)
		})
	}(), t.extend(o.prototype, {
		speed: .2,
		bleed: 0,
		zIndex: -100,
		iosFix: !0,
		androidFix: !0,
		position: "center",
		refresh: function () {
			this.boxWidth = this.$element.outerWidth(), this.boxHeight = this.$element.outerHeight() + 2 * this.bleed, this.boxOffsetTop = this.$element.offset().top - this.bleed, this.boxOffsetLeft = this.$element.offset().left, this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;
			var t = o.winHeight,
				i = o.docHeight,
				e = Math.min(this.boxOffsetTop, i - t),
				s = Math.max(this.boxOffsetTop + this.boxHeight - t, 0),
				h = this.boxHeight + (e - s) * (1 - this.speed) | 0,
				n = (this.boxOffsetTop - e) * (1 - this.speed) | 0;
			if (h * this.aspectRatio >= this.boxWidth) {
				this.imageWidth = h * this.aspectRatio | 0, this.imageHeight = h, this.offsetBaseTop = n;
				var r = this.imageWidth - this.boxWidth;
				this.offsetLeft = "left" == this.positionX ? 0 : "right" == this.positionX ? -r : isNaN(this.positionX) ? -r / 2 | 0 : Math.max(this.positionX, -r)
			} else {
				this.imageWidth = this.boxWidth, this.imageHeight = this.boxWidth / this.aspectRatio | 0, this.offsetLeft = 0;
				var r = this.imageHeight - h;
				this.offsetBaseTop = "top" == this.positionY ? n : "bottom" == this.positionY ? n - r : isNaN(this.positionY) ? n - r / 2 | 0 : n + Math.max(this.positionY, -r)
			}
		},
		render: function () {
			var t = o.scrollTop,
				i = o.scrollLeft,
				e = t + o.winHeight;
			this.visibility = this.boxOffsetBottom > t && this.boxOffsetTop < e ? "visible" : "hidden", this.mirrorTop = this.boxOffsetTop - t, this.mirrorLeft = this.boxOffsetLeft - i, this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed), this.$mirror.css({
				transform: "translate3d(0px, 0px, 0px)",
				visibility: this.visibility,
				top: this.mirrorTop,
				left: this.mirrorLeft,
				height: this.boxHeight,
				width: this.boxWidth
			}), this.$slider.css({
				transform: "translate3d(0px, 0px, 0px)",
				position: "absolute",
				top: this.offsetTop,
				left: this.offsetLeft,
				height: this.imageHeight,
				width: this.imageWidth
			})
		}
	}), t.extend(o, {
		scrollTop: 0,
		scrollLeft: 0,
		winHeight: 0,
		winWidth: 0,
		docHeight: 1 << 30,
		docWidth: 1 << 30,
		sliders: [],
		isReady: !1,
		isFresh: !1,
		isBusy: !1,
		setup: function () {
			if (!this.isReady) {
				var s = t(e),
					h = t(i);
				h.on("scroll.px.parallax load.px.parallax", function () {
					var t = o.docHeight - o.winHeight,
						i = o.docWidth - o.winWidth;
					o.scrollTop = Math.max(0, Math.min(t, h.scrollTop())), o.scrollLeft = Math.max(0, Math.min(i, h.scrollLeft())), o.requestRender()
				}).on("resize.px.parallax load.px.parallax", function () {
					o.winHeight = h.height(), o.winWidth = h.width(), o.docHeight = s.height(), o.docWidth = s.width(), o.isFresh = !1, o.requestRender()
				}), this.isReady = !0
			}
		},
		configure: function (i) {
			"object" == typeof i && (delete i.refresh, delete i.render, t.extend(this.prototype, i))
		},
		refresh: function () {
			t.each(this.sliders, function () {
				this.refresh()
			}), this.isFresh = !0
		},
		render: function () {
			this.isFresh || this.refresh(), t.each(this.sliders, function () {
				this.render()
			})
		},
		requestRender: function () {
			var t = this;
			this.isBusy || (this.isBusy = !0, i.requestAnimationFrame(function () {
				t.render(), t.isBusy = !1
			}))
		}
	});
	var n = t.fn.parallax;
	t.fn.parallax = h, t.fn.parallax.Constructor = o, t.fn.parallax.noConflict = function () {
		return t.fn.parallax = n, this
	}, t(e).on("ready.px.parallax.data-api", function () {
		t('[data-parallax="scroll"]').parallax()
	})
}(jQuery, window, document);