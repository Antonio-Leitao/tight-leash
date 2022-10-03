
export function adaptiveGrowth(node){
	node.setAttribute("style", "height:" + (node.scrollHeight) + "px;overflow-y:hidden;");
  node.addEventListener("input", OnInput, false);
	function OnInput(){
		node.style.height=0;
		node.style.height=node.scrollHeight +"px";
	}
	return {
    destroy() {
      document.removeEventListener("input", OnInput, false);
    },
  };
};


