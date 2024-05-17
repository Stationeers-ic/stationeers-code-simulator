import { Err, LexerError } from "ic10"

export class TokenError extends Err {
	constructor(public error: LexerError) {
		//@ts-ignore
		super("", "tokenError", error.line.index, error.line.index, error.line.start, error.line.end)
		switch (this.error.type) {
			case "UNEXPECTED_TOKEN":
				if (this.error.expected === undefined) {
					this.message = `Unexpected token ${this.error.received}`
					break
				} else {
					if (this.error.expected.length > 1) {
						this.message = `Unexpected token ${this.error.received}, expected ${this.error.expected?.join(", ")}`
						break
					} else {
						this.message = `Unexpected token ${this.error.received}, expected ${this.error.expected[0]}`
						break
					}
				}
			case "MISSING_TOKEN":
				if (this.error.expected === undefined) {
					this.message = "Missing token"
					break
				}
				if (this.error.expected.length > 1) {
					this.message = `Missing tokens ${this.error.expected?.join(", ")}`
					break
				} else {
					this.message = `Missing token ${this.error.expected[0]}`
					break
				}
			case "UNRECOGNIZED_INSTRUCTION":
				const token = this.error.token?.value
				this.message = `Unrecognized instruction ${token}`
				break
		}

		if (this.error.suggested) {
			this.message += `, did you mean ${this.error.suggested}?`
		}
	}
}
