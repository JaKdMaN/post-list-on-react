import React from "react";
import cl from "./MyLoader.module.css"

const MyLoader = () => {
	return (
		<div className={cl.loader}>
			<div className={cl.loaderItem}>
			</div>
		</div>

	)
}

export default MyLoader;