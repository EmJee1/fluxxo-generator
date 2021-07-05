import { InquirerResponse } from './index.js'
import ejs from 'ejs'

const render = (content: string, data: InquirerResponse) =>
	ejs.render(content, data)

export default render
