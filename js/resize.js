// function resize (element) {
//     let elSize = window.getComputedStyle(element, null).getPropertyValue('font-size');
//     console.log(elSize)
    
//     const s = `;font-size: ${parseInt(elSize)/2}px`;
//     element.setAttribute("style", element.getAttribute("style") + s);
//     for (let i = 0; i < element.children.length; i++) {
//       resize(element.children[i]);
//     }
//   }
// resize(document.getElementsByTagName("body")[0]); 
let isIpad = /Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 1;
function updateText({page, scale}){
    if($(page).length > 0) {
        console.log(scale);
        if(page.tagName == "A" || page.tagName == "H1" || page.tagName == "LI" ||page.tagName == "INPUT" || page.tagName == "LABEL" || page.tagName == "BUTTON" || page.tagName == "H5" || page.tagName=="H2" || page.tagName=="SPAN" || page.tagName=="P"){
            $(page).css("font-size", "");
            let fontSize = parseInt($(page).css("font-size"), 10) * (scale * scale);
            $(page).css("font-size", fontSize+"px");
        }
        
        for (let i = 0; i < $(page).children().length; i++) {
            const branch = $(page).children()[i];
            updateText({page: branch, scale});
        }
    }
  }
function ss(){
    let page = document.getElementsByTagName("body")[0];
    let scale = window.getComputedStyle(document.querySelector('.zoom'), null).getPropertyValue('zoom');
    updateText({page, scale}) 
  }
if (isIpad == true){
    ss()
}
// for another helper function that calculates the exact progress value along a motion path where it'll hit the center of the provided target on the given axis ("y" by default), see https://codepen.io/GreenSock/pen/BaPdrKM
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);
// function findProgress(target, path, {axis="y", precision=1, ease="none"}={}) {
//     target = gsap.utils.toArray(target)[0];
//     path = gsap.utils.toArray(path)[0];
//     ease = gsap.parseEase(ease) || (p => p);
// 		let tBounds = target.getBoundingClientRect(),
//         pBounds = path.getBoundingClientRect(),
//         useX = axis === "x",
//         tCenter = (tBounds[useX ? "left" : "top"] + tBounds[useX ? "right" : "bottom"]) / 2,
//         rawPath = MotionPathPlugin.cacheRawPathMeasurements(MotionPathPlugin.getRawPath(path), Math.round(precision * 12)),
//         start = rawPath[0][useX ? 0 : 1],
//         end = rawPath[rawPath.length - 1][rawPath[rawPath.length-1].length - (useX ? 2 : 1)],
//         pinpoint = gsap.utils.mapRange(pBounds[useX ? "left" : "top"], pBounds[useX ? "right" : "bottom"], start, end, tCenter),
//         l = Math.round(precision * 200),
//         inc = 1 / l,
//         i = 1,
//         prevV = start,
//         p, v;
//   if (pinpoint < Math.min(start, end)) {
//     p = start < end ? 0 : 1;
//   } else if (pinpoint > Math.max(start, end)) {
//     p = start < end ? 1 : 0;
//   } else {
//      for (; i < l; i++) {
//       p = i / l;
//       v = MotionPathPlugin.getPositionOnPath(rawPath, ease(p))[axis];
//       if ((v >= pinpoint && prevV < pinpoint) || (v <= pinpoint && prevV > pinpoint)) {
//         return p - (1 - gsap.utils.normalize(prevV, v, pinpoint)) * inc;
//       }
//       prevV = v;
//     }
//   }
//   return p;
// }


gsap.set("#motionSVG", { scale: 0.7, autoAlpha: 1 });
gsap.set("#tractor", {transformOrigin: "50% 50%"});
let rotateTo = gsap.quickTo("#tractor", "rotation"),
    prevDirection = 0;

gsap.to("#motionSVG", {
  scrollTrigger: {
    trigger: "#motionPath",
    start: "top center",
    end: () => "+=" + document.querySelector("#motionPath").getBoundingClientRect().height,
    scrub: 0.5,
    markers: true,
    onUpdate: self => {
      if (prevDirection !== self.direction) { // only run this when we're changing direction
        rotateTo(self.direction === 1 ? 0 : -180);
        prevDirection = self.direction;
      }
    }
  },
  ease: pathEase("#motionPath"), // a custom ease that helps keep the tractor centered
  immediateRender: true,
  motionPath: {
    path: "#motionPath",
    align: "#motionPath",
    alignOrigin: [0.5, 0.5],
    autoRotate: 90,
  }
});




// helper function that returns and ease that bends time to ensure the tractor stays relatively centered. Requires MotionPathPlugin of course
function pathEase(path, axis="y", precision=1) {
		let rawPath = MotionPathPlugin.cacheRawPathMeasurements(MotionPathPlugin.getRawPath(gsap.utils.toArray(path)[0]), Math.round(precision * 12)),
			useX = axis === "x",
			start = rawPath[0][useX ? 0 : 1],
			end = rawPath[rawPath.length - 1][rawPath[rawPath.length-1].length - (useX ? 2 : 1)],
			range = end - start,
			l = Math.round(precision * 200),
			inc = 1 / l,
			positions = [0],
			a = [],
			minIndex = 0,
			getClosest = p => {
				while (positions[minIndex] <= p && minIndex++ < l) { }
				a.push((p - positions[minIndex-1]) / (positions[minIndex] - positions[minIndex - 1]) * inc + minIndex * inc);
			},
			i = 1,
			p, v;
		for (; i < l; i++) {
			p = i / l;
			v = MotionPathPlugin.getPositionOnPath(rawPath, p)[axis];
			positions[i] = (v - start) / range;
		}
		positions[l] = 1;
		for (i = 0; i < l; i++) {
			getClosest(i / l);
		}
		a.push(1);
		return p => {
			let i = p * l,
				s = a[i | 0];
			return s + (a[Math.ceil(i)] - s) * (i % 1);
		}
	}
