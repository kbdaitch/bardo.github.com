import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Helmet from "react-helmet"
import { config } from 'config'

export default class Index extends React.Component {
	render () {
		return (
			<div>
				<Helmet
					title={config.siteTitle}
					meta={[
						{"name": "description", "content": "Sample"},
						{"name": "keywords", "content": "sample, something"},
					]}
				/>
				<h1>
					Hello World!
				</h1>
				<h3>Supported file types</h3>
				<ul>
					<li>
						<Link to={prefixLink('/home/')}>Home</Link>
					</li>
					<li>
						<Link to={prefixLink('/office/')}>Office</Link>
					</li>
				</ul>
				<p>Welcome to your new clean Gatsby site</p>
			</div>
		)
	}
}
