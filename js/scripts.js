WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function () {
	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: 'Закрыть',
		NEXT: 'Следующий',
		PREV: 'Предыдущий',
		MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
	}


	// Spin
	var firstSpin = [0, 60, 240, 180],
		secondSpin = [120, 300],
		numberRotates = 8,
		numberAttempts = localStorage.getItem('numberAttempts') !== null ? Number(localStorage.getItem('numberAttempts')) : 2,
		animating = false

	$('.first_section .data .pre_title span').text(numberAttempts)

	$('.first_section .data .spin_btn').click(function(e) {
		e.preventDefault()

		if (!animating) {
			if (numberAttempts) {
				animating = true

				let randomIndex = 0,
					value = 0

				if (numberAttempts === 2) {
					randomIndex = Math.floor(Math.random() * firstSpin.length)
					value = `rotate(${firstSpin[randomIndex] + 360 * numberRotates}deg)`
				}

				if (numberAttempts === 1) {
					randomIndex = Math.floor(Math.random() * secondSpin.length)
					value = `rotate(${secondSpin[randomIndex] + 360 * numberRotates}deg)`
				}

				$('.first_section .wheel .inner').css('transform', 'rotate(0deg)')

				setTimeout(() => {
					$('.first_section .wheel .inner').addClass('animate')
					$('.first_section .wheel .inner').css('transform', value)
				})

				numberAttempts = numberAttempts - 1

				localStorage.setItem('numberAttempts', numberAttempts)

				$('.first_section .data .pre_title span').text(numberAttempts)

				setTimeout(() => {
					$('.first_section .wheel .inner').removeClass('animate')

					animating = false

					Fancybox.show([{
						src: document.getElementById('order_modal'),
						type: 'inline'
					}])
				}, 5000)
			} else {
				Fancybox.show([{
					src: document.getElementById('warning_modal'),
					type: 'inline'
				}])
			}
		}
	})
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 390) document.getElementsByTagName('meta')['viewport'].content = 'width=390, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})