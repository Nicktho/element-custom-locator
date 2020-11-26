import { step, TestSettings, By, Locator, Until } from '@flood/element'
import { BaseLocator } from '@flood/element-core/dist/src/page/Locator'
import { LocatorBuilder } from '@flood/element-core/dist/src/page/types'

class CustomBuilder implements LocatorBuilder {
	constructor(public query: string) {}

	get pageFuncArgs(): any[] {
		return [this.query]
	}

	get pageFunc(): LocatorBuilder['pageFunc'] {
		return (query: string) => {
			return document.querySelector(query)
		}
	}

	get pageFuncMany(): LocatorBuilder['pageFuncMany'] {
		return (query: string) => {
			return document.querySelectorAll(query)
		}
	}
}

const customLocator = (query: string): Locator =>
	new BaseLocator(new CustomBuilder(query), `customLocator(${query})`)

export const settings: TestSettings = {
	loopCount: 1,
	waitUntil: 'visible',
}

export default () => {
	step('Start', async browser => {
		await browser.visit('https://challenge.flood.io')
	})

	step('Wait until with By', async browser => {
		await browser.wait(
			Until.elementIsVisible(By.css('#new_challenger > input.btn.btn-xl.btn-default')),
		)
	})

	step('Wait until with customLocator', async browser => {
		await browser.wait(
			Until.elementIsVisible(customLocator('#new_challenger > input.btn.btn-xl.btn-default')),
		)
	})

	step('Find with By', async browser => {
		await browser.findElement(By.css('#new_challenger > input.btn.btn-xl.btn-default'))
	})

	step('Find with customLocator', async browser => {
		await browser.findElement(customLocator('#new_challenger > input.btn.btn-xl.btn-default'))
	})
}
