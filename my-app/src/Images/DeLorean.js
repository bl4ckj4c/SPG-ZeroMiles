import * as React from "react";

function DeLorean(props) {
  return (
    <svg width="1em" viewBox="0 0 104.88 52.5" height="8em" {...props}>
      <defs>
        <clipPath id="prefix__h">
          <path d="M2 19h101.887v33H2zm0 0" />
        </clipPath>
        <clipPath id="prefix__i">
          <path d="M1.363 36H14v6H1.363zm0 0" />
        </clipPath>
        <clipPath id="prefix__j">
          <path d="M1.363 35H15v8H1.363zm0 0" />
        </clipPath>
        <clipPath id="prefix__k">
          <path d="M37 23h35v20H37zm0 0" />
        </clipPath>
        <clipPath id="prefix__l">
          <path
            d="M37.262 30.063L41.738 42.3h20.739c4.433-3.809 6.336-7.617 8.707-11.426-.172-2.766-.266-5.652-1.059-7.375"
            clipRule="evenodd"
          />
        </clipPath>
        <clipPath id="prefix__c">
          <path d="M0 0h105v53H0z" />
        </clipPath>
        <clipPath id="prefix__n">
          <path d="M41 24h28v8H41zm0 0" />
        </clipPath>
        <clipPath id="prefix__o">
          <path
            d="M41.574 29.578l10.739-4.539 16.675-.406v5.347l-27.656 1.055zm0 0"
            clipRule="evenodd"
          />
        </clipPath>
        <clipPath id="prefix__q">
          <path d="M1.363 33H9v5H1.363zm0 0" />
        </clipPath>
        <clipPath id="prefix__r">
          <path d="M64 32h15v14H64zm0 0" />
        </clipPath>
        <clipPath id="prefix__s">
          <path
            d="M78.648 32.535c-2.507 2.965-4.476 6.11-5.043 9.723-.16 1.027-.566 2.023-2.44 2.84l-6.75-.325c.32-.484.546-.87.651-1.136l6.098-.082c1.227-3.727 3.121-7.457 5.207-11.184zm0 0"
            clipRule="evenodd"
          />
        </clipPath>
        <clipPath id="prefix__f">
          <path d="M0 0h105v53H0z" />
        </clipPath>
        <clipPath id="prefix__u">
          <path d="M98 35h5.887v5H98zm0 0" />
        </clipPath>
        <clipPath id="prefix__v">
          <path d="M97 34h6.887v7H97zm0 0" />
        </clipPath>
        <clipPath id="prefix__w">
          <path d="M1.363 39H17v7H1.363zm0 0" />
        </clipPath>
        <clipPath id="prefix__x">
          <path d="M12 32h21v20.004H12zm0 0" />
        </clipPath>
        <clipPath id="prefix__z">
          <path d="M0 0h21v21H0z" />
        </clipPath>
        <clipPath id="prefix__C">
          <path d="M0 0h13v13H0z" />
        </clipPath>
        <clipPath id="prefix__G">
          <path d="M.422 1h20.445v19.828H.422zm0 0" />
        </clipPath>
        <clipPath id="prefix__F">
          <path d="M0 0h21v21H0z" />
        </clipPath>
        <clipPath id="prefix__K">
          <path d="M.46 1H13v12H.46zm0 0" />
        </clipPath>
        <clipPath id="prefix__J">
          <path d="M0 0h14v14H0z" />
        </clipPath>
        <clipPath id="prefix__M">
          <path d="M90 37h13.887v8H90zm0 0" />
        </clipPath>
        <mask id="prefix__d">
          <g filter="url(#prefix__a)">
            <image
              width={105}
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGkAAAA1CAYAAABCzsW2AAAABmJLR0QA/wD/AP+gvaeTAAABEElEQVR4nO3TQWrDMBBG4ecgev8ztrsuSnKCdtG6FBEsyVHkkfs+GGI5YxjrtxbgE4V2OXoAlRnSBAxpAoY0AUOagCFNwJAmYEgTSMA7sFTUJVvTsNYDEvDKdhit4fXuz4uK9akk4I04gUTqp3L9dPdOUsQNO3M/pXXrSTr6hf5l/9ZJGjHc4RswQ38CPvi23qTwW/ov79lbBv5TCbjtDCRKz7MqTIAJuA7YyKg9rc9v1VbPQwGuJynyRvbqiTJH7ay/tQAvgYbr+ZIR5ujSs160uPdMfq9mqOJwHXuizLGrZ09II7V8EH+vTxVa9JBG2/oA8nvDQjOk47R8EJIkSZIkSZIkSZIkSZIkSZIkqbcv6/QOJDDbeYQAAAAASUVORK5CYII="
              xlinkType="simple"
              xlinkActuate="onLoad"
              height={53}
              xlinkShow="embed"
            />
          </g>
        </mask>
        <mask id="prefix__g">
          <g filter="url(#prefix__a)">
            <image
              width={105}
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGkAAAA1CAYAAABCzsW2AAAABmJLR0QA/wD/AP+gvaeTAAAAzklEQVR4nO3SSQ7CMBAEwAnKB/j/DznwBbiABIgsymJ75KpTotCy1c0QEY+gaZfaF2CZkRIwUgJGSsBICRgpASMlYKQEjJTAGBH3j/dhx/PRmRrvTRoj4vZ6PrPwGiPXzhx25tRI3RVxcmZXfs1IWYrYkklxZomRDFZ4JOVVOPM9UvdFNJCZzB81UvoiWs78G6nLIho+c3GkbooolNmUHyLiWuiCpTJZ7rk6Mxf6NfXtiEz1IiqfOfu7uYL51sIfGAAAAAAAAAAAAAAAoCNPP5AL7dzAiwwAAAAASUVORK5CYII="
              xlinkType="simple"
              xlinkActuate="onLoad"
              height={53}
              xlinkShow="embed"
            />
          </g>
        </mask>
        <mask id="prefix__y">
          <g filter="url(#prefix__a)">
            <path fillOpacity={0.718} d="M-10.488-5.25h125.856v63H-10.488z" />
          </g>
        </mask>
        <mask id="prefix__A">
          <g filter="url(#prefix__a)">
            <g
              filter="url(#prefix__b)"
              transform="translate(.56 .808) scale(.23774)"
            >
              <image
                width={82}
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref="data:image/png;base64,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"
                xlinkType="simple"
                xlinkActuate="onLoad"
                height={81}
                xlinkShow="embed"
              />
            </g>
          </g>
        </mask>
        <mask id="prefix__B">
          <g filter="url(#prefix__a)">
            <path fillOpacity={0.91} d="M-10.488-5.25h125.856v63H-10.488z" />
          </g>
        </mask>
        <mask id="prefix__D">
          <g filter="url(#prefix__a)">
            <g
              filter="url(#prefix__b)"
              transform="translate(.601 .611) scale(.23774)"
            >
              <image
                width={50}
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAAAAAA7VNdtAAAAAmJLR0QA/4ePzL8AAAQhSURBVEiJlZbbVttKDIYlzXh8iu2cKKW0lPd/K7JbSiEhiePzHNQLOyGEpF1bd/bSt6TRSPoH4H8bnvuF/W8GBuB/IQiIREiIAMzsHDs+pfD9B5EQUkpBBMDOWGOMdcx8CUEi6Sk/8JWShOCMbtum7bSx7jiSfANQCBVEcRzHoe9JZKvbuiqLsmo6Y48YfAshVBAn2ThLkyj0JILRTbXLN9vNrqy1cXyKIEk/Tiez2Ww6TqJgiFIWm9fVcrXOy9bYPSP3hBeMJvPrz5/m03QU+FIgO9PVZf66fH6KfLlrYM/IA5HOrr/c3nyaZXGopEBkdqZritl0nES+JIQ9I/dZJfObb9++fp6nceAJ0d+LM2aUJkkc+hKBmfvz9IhQo+nnu/u7L/Ms8iURAgIwsGdVEISB7xE76xwfECQZja+/fr//epVFStBQEwRkElJ6niS2RhvTMxIAUATJ7Obb3e2nceQJPLpdBEIShGC7pmk7y44BJACSisZXN7c3V1mkiE4aChEicLqpyrLR1gGAACAvnFzf3d/dTEa+OCF6qA9T1612DCAAhUpmt3ffb+dJcIYAQEQEp5uqqrVlAAIgL8ym82kWKXFmevqCRtl0Ns0iTyAAAQoVpeNJFvsSzyOAwo+yySSNFR2QJEvj/obPIySDOE2TyJfYF1GF8SgOL6XVh/GCgw8BCi+IokCJi0EAEIUanAbE9311Oa0hNeX7vhQIQIgkpefJs/U9QoT0PCkJEQgQUQhBeG4/vYNI9LkT9JP5LwLeBpiA2TnnTjfPBxu8AICYnTX6eB2cBdgarbV1DEDAznRt+w+GndVt2xnHDARsu6aum87+hWE2g1MfxXR1WZaN/lsYq5uyKOrOOABitl1V5LuqMRcLwM605W67q1rbJ+a6Kl9vtlVnLiK2q/L1Jq/2iVldb9erdV5dSo1dV+evq9cBEQCA5KkgDAMl8dzEsNP1+vePxc/nbWPdgAxNp6Sgjww7XW+ffy4Wj6uiswAgABAASXie8qQgPBU2tqbOXx4fHn685I3hHukhJCGEIMJ33cZsdbVdPi4e/ntal9oekF5GEXHwP8irs6Ytty+Pi4fFr1XR9iUV+4Rdr6VH5pzRXVWsfz8uHha/XvJ6uARxOKS1xhhjjDXWWGuM0W1bFZvl04/Fw+LXMq/3XSiHMwKAM12121xN0jhQgyQ1Zb5e/n56en7N+7X3hgBbYGe7arde9sIniI1uqt12vXxZvm7KRp8KH7BltropNqtxmsShEsSma8rddrve5Lu6tfaDvAIgCs8Po9FoFEdBj7RVWRRFWbfmeDKOxQRJSOUHQeArTyBb3bVN07Sdse64yd8/SJBISulJKQjZWWO0Mca5yw8S6IWBSBAiMrNz1vGHPfKxcxGwf14xA394Jv3NLq+1P9EBjb9YCuzcAAAAAElFTkSuQmCC"
                xlinkType="simple"
                xlinkActuate="onLoad"
                height={50}
                xlinkShow="embed"
              />
            </g>
          </g>
        </mask>
        <mask id="prefix__E">
          <g filter="url(#prefix__a)">
            <path fillOpacity={0.718} d="M-10.488-5.25h125.856v63H-10.488z" />
          </g>
        </mask>
        <mask id="prefix__H">
          <g filter="url(#prefix__a)">
            <g
              filter="url(#prefix__b)"
              transform="translate(.42 .857) scale(.23774)"
            >
              <image
                width={85}
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref="data:image/png;base64,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"
                xlinkType="simple"
                xlinkActuate="onLoad"
                height={84}
                xlinkShow="embed"
              />
            </g>
          </g>
        </mask>
        <mask id="prefix__I">
          <g filter="url(#prefix__a)">
            <path fillOpacity={0.91} d="M-10.488-5.25h125.856v63H-10.488z" />
          </g>
        </mask>
        <mask id="prefix__L">
          <g filter="url(#prefix__a)">
            <g
              filter="url(#prefix__b)"
              transform="translate(.462 .66) scale(.23774)"
            >
              <image
                width={52}
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAAAAADgE0Q3AAAAAmJLR0QA/4ePzL8AAARkSURBVEiJnZZZV9tIEIWrqhcttuUNGJbAzPz/PxVIQhIwNpKtrdVdNQ+yAzbgzEk/6vR3bqnrdt8C+IOFH3zsvwuA/C8IAQkJEQBERFjkDYhvCVJaKUUIwByCDxxE5AiERMoYayNjFKEE3znnXOcD72GvIUTSNorTNE0SawjFd01TVVXdtN7zqyL1axll43SYZdlomMRGIXvXlJt1ka/LqvXhhXpRQqWjNJvMZrPJeJhGhlC8a8p1vlo+rfJN7QLLIURkkuHk5OzsdD7N0sRqAgmdqzbFcvHw+PiUl63fUbvykEyazc8uLs9PZ9kwtkohCofOVZv8ZDoexEatmx2ld7WZdHxy+enT5V+zcRobRQQoIsG7ZjLOskGsCWBH6a2OjrOTTzc31+fzLIm0wr65IBwlSToYxFYRiGwbvYVUNJpd3vx7cznPEqN6PwAgACmjbWSNJgghBPG/lJBsOvnr6ubm6jRLtMJXzUNEVEopkuCc88wsPYSoo9H84vr64nScaHXoLEIkhNA1TdN2QbYQKJNOzi4uz0+yxNAbCyMoFPZttVmXTRdQQAEAmXR6fv3P9fkstW8ZAEQgAvFtXdcuMIACQGVHJ1c3f1/NR/awtld/xqGpyqrpWIAAgEySTeezLDUfMACo7GA8n09HsUYEAkBl09FkmqUf6UDfyOF4OhkmmmALJaNsNIjfOYSXpUwyzLJhbAiBAEnZZDD8DYOobTIYpLFR2/JMnKaxVccgQNJRnCRW0w6yUWTfdPVQSmkbWaMIkACRlDHmN0xPaa3V9vSQlFKEeJxCJCIiRAACAEBA+A2yAwEAgABEWJj58HE7XAIi210EAsy+8yEcZwA4BB8CCwABMHfOue7lsXlfSDg457ogIgQgoWvquumvyhEh79qmcT4IEIAE15Rl1fhwVCl0dVVWjWcBApHgqk2xqdpjBQp3Tblel7urIcFV6zxf146P/JFvy+I53zQd90fOXV2sls/rpvtYKrh+T+25v+5IZKI0TWOrPrCFhK5c/fxy922xdqGHeipOIqsVvReowr7OH77efv2xqrr+jQAEJKWtjaxW9A4l3NXF47e72/tF0QaBrZIAktLamHeMK8K+Lp7u726//lhVnmELAYAgEClShISvAggEOLg6X9zfff7yfblxQV5DvV/x1/5tAEjo2vL58fvd57v7RdF6gT2IOTAzC3NveWbm4LumKpYP324/390v8novakCCK0HYNeXmZDJKI6MIsY+nKl8+fr+//7Eo6i7shZqAB5Hg6k2+nE9GaWQ0gbBvm7JYLR5+/nxcrWt3GJ8CXiR0dfn8NJtmwyTSCiS4ttw8r56eFqu8bF/88mskEAgt+7YqlpPx6CXdq3WRP+dFWTvP74wEAEjaREk6GA7SODKEHLqmrjZlWTVu77btNRKRlLFRFEWR1oQSvHNN27ad3x+PDmMPSSmttVJEIBKC996Hw0fnbe4hIlFvJhFmFn4zu713E/DFGPLBmPgH6z+q66L2SWl2QQAAAABJRU5ErkJggg=="
                xlinkType="simple"
                xlinkActuate="onLoad"
                height={52}
                xlinkShow="embed"
              />
            </g>
          </g>
        </mask>
        <linearGradient
          x1={259.532}
          gradientTransform="matrix(.20119 0 0 -.20046 1.093 52.6)"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          y1={271.837}
          x2={249.125}
          gradientUnits="userSpaceOnUse"
          y2={-11.355}
          xlinkType="simple"
          xlinkActuate="onLoad"
          id="prefix__e"
          xlinkShow="other"
        >
          <stop stopColor="#BBB" offset={0} />
          <stop stopColor="#BBB" offset={0.068} />
          <stop stopColor="#BBB" offset={0.125} />
          <stop stopColor="#BBB" offset={0.188} />
          <stop stopColor="#BBB" offset={0.219} />
          <stop stopColor="#B8B8B8" offset={0.223} />
          <stop stopColor="#B4B4B4" offset={0.227} />
          <stop stopColor="#AFAFAF" offset={0.23} />
          <stop stopColor="#ABABAB" offset={0.234} />
          <stop stopColor="#A6A6A6" offset={0.238} />
          <stop stopColor="#A1A1A1" offset={0.242} />
          <stop stopColor="#9C9C9C" offset={0.246} />
          <stop stopColor="#979797" offset={0.25} />
          <stop stopColor="#929292" offset={0.254} />
          <stop stopColor="#8E8E8E" offset={0.258} />
          <stop stopColor="#898989" offset={0.262} />
          <stop stopColor="#848484" offset={0.266} />
          <stop stopColor="#7F7F7F" offset={0.27} />
          <stop stopColor="#7A7A7A" offset={0.273} />
          <stop stopColor="#757575" offset={0.277} />
          <stop stopColor="#707070" offset={0.281} />
          <stop stopColor="#6C6C6C" offset={0.285} />
          <stop stopColor="#676767" offset={0.289} />
          <stop stopColor="#626262" offset={0.293} />
          <stop stopColor="#5D5D5D" offset={0.297} />
          <stop stopColor="#585858" offset={0.301} />
          <stop stopColor="#535353" offset={0.305} />
          <stop stopColor="#4F4F4F" offset={0.309} />
          <stop stopColor="#4A4A4A" offset={0.313} />
          <stop stopColor="#454545" offset={0.316} />
          <stop stopColor="#404040" offset={0.32} />
          <stop stopColor="#3C3C3C" offset={0.324} />
          <stop stopColor="#383838" offset={0.328} />
          <stop stopColor="#353535" offset={0.332} />
          <stop stopColor="#333" offset={0.336} />
          <stop stopColor="#303030" offset={0.34} />
          <stop stopColor="#2E2E2E" offset={0.344} />
          <stop stopColor="#2C2C2C" offset={0.348} />
          <stop stopColor="#292929" offset={0.352} />
          <stop stopColor="#272727" offset={0.355} />
          <stop stopColor="#242424" offset={0.359} />
          <stop stopColor="#222" offset={0.363} />
          <stop stopColor="#1F1F1F" offset={0.367} />
          <stop stopColor="#1D1D1D" offset={0.371} />
          <stop stopColor="#1A1A1A" offset={0.375} />
          <stop stopColor="#181818" offset={0.379} />
          <stop stopColor="#161616" offset={0.383} />
          <stop stopColor="#131313" offset={0.387} />
          <stop stopColor="#111" offset={0.391} />
          <stop stopColor="#0E0E0E" offset={0.395} />
          <stop stopColor="#0C0C0C" offset={0.398} />
          <stop stopColor="#090909" offset={0.402} />
          <stop stopColor="#070707" offset={0.406} />
          <stop stopColor="#040404" offset={0.41} />
          <stop stopColor="#020202" offset={0.414} />
          <stop stopColor="#010101" offset={0.418} />
          <stop offset={0.422} />
          <stop offset={0.438} />
          <stop offset={0.5} />
          <stop offset={0.932} />
          <stop offset={1} />
        </linearGradient>
        <linearGradient
          x1={0}
          gradientTransform="matrix(.19929 0 0 .19857 1.518 .397)"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          y1={154.297}
          x2={0}
          gradientUnits="userSpaceOnUse"
          y2={122.052}
          xlinkType="simple"
          xlinkActuate="onLoad"
          id="prefix__p"
          xlinkShow="other"
        >
          <stop stopColor="#4D4D4D" offset={0} />
          <stop stopColor="#4D4D4D" offset={0.125} />
          <stop stopColor="#4D4D4D" offset={0.141} />
          <stop stopColor="#4C4C4C" offset={0.145} />
          <stop stopColor="#4C4C4C" offset={0.148} />
          <stop stopColor="#4B4B4B" offset={0.152} />
          <stop stopColor="#4B4B4B" offset={0.156} />
          <stop stopColor="#4A4A4A" offset={0.16} />
          <stop stopColor="#4A4A4A" offset={0.164} />
          <stop stopColor="#494949" offset={0.168} />
          <stop stopColor="#494949" offset={0.172} />
          <stop stopColor="#484848" offset={0.176} />
          <stop stopColor="#484848" offset={0.18} />
          <stop stopColor="#474747" offset={0.184} />
          <stop stopColor="#474747" offset={0.188} />
          <stop stopColor="#464646" offset={0.191} />
          <stop stopColor="#464646" offset={0.195} />
          <stop stopColor="#454545" offset={0.199} />
          <stop stopColor="#444" offset={0.203} />
          <stop stopColor="#444" offset={0.207} />
          <stop stopColor="#434343" offset={0.211} />
          <stop stopColor="#434343" offset={0.215} />
          <stop stopColor="#424242" offset={0.219} />
          <stop stopColor="#424242" offset={0.223} />
          <stop stopColor="#414141" offset={0.227} />
          <stop stopColor="#414141" offset={0.23} />
          <stop stopColor="#404040" offset={0.234} />
          <stop stopColor="#404040" offset={0.238} />
          <stop stopColor="#3F3F3F" offset={0.242} />
          <stop stopColor="#3F3F3F" offset={0.246} />
          <stop stopColor="#3E3E3E" offset={0.25} />
          <stop stopColor="#3D3D3D" offset={0.254} />
          <stop stopColor="#3D3D3D" offset={0.258} />
          <stop stopColor="#3C3C3C" offset={0.262} />
          <stop stopColor="#3C3C3C" offset={0.266} />
          <stop stopColor="#3B3B3B" offset={0.27} />
          <stop stopColor="#3B3B3B" offset={0.273} />
          <stop stopColor="#3A3A3A" offset={0.277} />
          <stop stopColor="#3A3A3A" offset={0.281} />
          <stop stopColor="#393939" offset={0.285} />
          <stop stopColor="#393939" offset={0.289} />
          <stop stopColor="#383838" offset={0.293} />
          <stop stopColor="#383838" offset={0.297} />
          <stop stopColor="#373737" offset={0.301} />
          <stop stopColor="#373737" offset={0.305} />
          <stop stopColor="#363636" offset={0.309} />
          <stop stopColor="#353535" offset={0.313} />
          <stop stopColor="#353535" offset={0.316} />
          <stop stopColor="#343434" offset={0.32} />
          <stop stopColor="#343434" offset={0.324} />
          <stop stopColor="#333" offset={0.328} />
          <stop stopColor="#333" offset={0.332} />
          <stop stopColor="#323232" offset={0.336} />
          <stop stopColor="#323232" offset={0.34} />
          <stop stopColor="#313131" offset={0.344} />
          <stop stopColor="#313131" offset={0.348} />
          <stop stopColor="#303030" offset={0.352} />
          <stop stopColor="#303030" offset={0.355} />
          <stop stopColor="#2F2F2F" offset={0.359} />
          <stop stopColor="#2F2F2F" offset={0.363} />
          <stop stopColor="#2E2E2E" offset={0.367} />
          <stop stopColor="#2D2D2D" offset={0.371} />
          <stop stopColor="#2D2D2D" offset={0.375} />
          <stop stopColor="#2C2C2C" offset={0.379} />
          <stop stopColor="#2C2C2C" offset={0.383} />
          <stop stopColor="#2B2B2B" offset={0.387} />
          <stop stopColor="#2B2B2B" offset={0.391} />
          <stop stopColor="#2A2A2A" offset={0.395} />
          <stop stopColor="#2A2A2A" offset={0.398} />
          <stop stopColor="#292929" offset={0.402} />
          <stop stopColor="#292929" offset={0.406} />
          <stop stopColor="#282828" offset={0.41} />
          <stop stopColor="#282828" offset={0.414} />
          <stop stopColor="#272727" offset={0.418} />
          <stop stopColor="#262626" offset={0.422} />
          <stop stopColor="#262626" offset={0.426} />
          <stop stopColor="#252525" offset={0.43} />
          <stop stopColor="#252525" offset={0.434} />
          <stop stopColor="#242424" offset={0.438} />
          <stop stopColor="#242424" offset={0.441} />
          <stop stopColor="#232323" offset={0.445} />
          <stop stopColor="#232323" offset={0.449} />
          <stop stopColor="#222" offset={0.453} />
          <stop stopColor="#222" offset={0.457} />
          <stop stopColor="#212121" offset={0.461} />
          <stop stopColor="#212121" offset={0.465} />
          <stop stopColor="#202020" offset={0.469} />
          <stop stopColor="#202020" offset={0.473} />
          <stop stopColor="#1F1F1F" offset={0.477} />
          <stop stopColor="#1E1E1E" offset={0.48} />
          <stop stopColor="#1E1E1E" offset={0.484} />
          <stop stopColor="#1D1D1D" offset={0.488} />
          <stop stopColor="#1D1D1D" offset={0.492} />
          <stop stopColor="#1C1C1C" offset={0.496} />
          <stop stopColor="#1C1C1C" offset={0.5} />
          <stop stopColor="#1B1B1B" offset={0.504} />
          <stop stopColor="#1B1B1B" offset={0.508} />
          <stop stopColor="#1A1A1A" offset={0.516} />
          <stop stopColor="#191919" offset={0.531} />
          <stop stopColor="#191919" offset={0.547} />
          <stop stopColor="#181818" offset={0.563} />
          <stop stopColor="#171717" offset={0.578} />
          <stop stopColor="#161616" offset={0.594} />
          <stop stopColor="#151515" offset={0.609} />
          <stop stopColor="#141414" offset={0.625} />
          <stop stopColor="#141414" offset={0.641} />
          <stop stopColor="#131313" offset={0.656} />
          <stop stopColor="#121212" offset={0.672} />
          <stop stopColor="#111" offset={0.688} />
          <stop stopColor="#101010" offset={0.703} />
          <stop stopColor="#0F0F0F" offset={0.719} />
          <stop stopColor="#0F0F0F" offset={0.734} />
          <stop stopColor="#0E0E0E" offset={0.75} />
          <stop stopColor="#0D0D0D" offset={0.766} />
          <stop stopColor="#0C0C0C" offset={0.781} />
          <stop stopColor="#0B0B0B" offset={0.797} />
          <stop stopColor="#0A0A0A" offset={0.813} />
          <stop stopColor="#0A0A0A" offset={0.828} />
          <stop stopColor="#090909" offset={0.844} />
          <stop stopColor="#080808" offset={0.859} />
          <stop stopColor="#070707" offset={0.875} />
          <stop stopColor="#060606" offset={0.891} />
          <stop stopColor="#050505" offset={0.906} />
          <stop stopColor="#050505" offset={0.922} />
          <stop stopColor="#040404" offset={0.938} />
          <stop stopColor="#030303" offset={0.953} />
          <stop stopColor="#020202" offset={0.969} />
          <stop stopColor="#010101" offset={0.984} />
          <stop offset={1} />
        </linearGradient>
        <pattern
          xmlnsXlink="http://www.w3.org/1999/xlink"
          id="prefix__m"
          patternUnits="userSpaceOnUse"
          width={105}
          xlinkShow="other"
          xlinkType="simple"
          patternTransform="matrix(.99057 0 0 -.99057 .435 52.5)"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 105 53"
          height={53}
          x={0}
          y={0}
          xlinkActuate="onLoad"
        >
          <g mask="url(#prefix__d)" clipPath="url(#prefix__c)">
            <path
              fill="url(#prefix__e)"
              d="M-23.733-11.66h152.466v76.32H-23.733z"
            />
          </g>
        </pattern>
        <pattern
          xmlnsXlink="http://www.w3.org/1999/xlink"
          id="prefix__t"
          patternUnits="userSpaceOnUse"
          width={105}
          xlinkShow="other"
          xlinkType="simple"
          patternTransform="matrix(.99057 0 0 -.99057 .435 52.5)"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 105 53"
          height={53}
          x={0}
          y={0}
          xlinkActuate="onLoad"
        >
          <g mask="url(#prefix__g)" clipPath="url(#prefix__f)">
            <path d="M-23.733-11.66h152.466v76.32H-23.733z" />
          </g>
        </pattern>
        <filter
          x="0%"
          y="0%"
          width="100%"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xlinkType="simple"
          xlinkActuate="onLoad"
          height="100%"
          id="prefix__a"
          xlinkShow="other"
        >
          <feColorMatrix
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
            colorInterpolationFilters="sRGB"
          />
        </filter>
        <filter
          x="0%"
          y="0%"
          width="100%"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xlinkType="simple"
          xlinkActuate="onLoad"
          height="100%"
          id="prefix__b"
          xlinkShow="other"
        >
          <feColorMatrix
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0.2126 0.7152 0.0722 0 0"
            colorInterpolationFilters="sRGB"
          />
        </filter>
      </defs>
      <path
        transform="matrix(.19929 0 0 .19857 1.518 .397)"
        fill="none"
        d="M427.562 28.295c57.313-98.164-5.331 102.414-46.846 136.388l.392-.08"
        stroke="#000"
        strokeWidth={3}
      />
      <path
        transform="matrix(.19929 0 0 .19857 1.518 .397)"
        fill="#28170B"
        fillRule="evenodd"
        d="M401.082 125.751l35.007-74.99 6.997 2.99-34.987 76.013zm0 0"
        stroke="#000"
      />
      <g clipPath="url(#prefix__h)">
        <path d="M77.766 51.086c-1.465-.078-3.063-.242-3.551-.363-.965-.239-42.836-.172-48.45.074-3.265.148-8.5-.145-10.18-.567-.628-.16-2.85-.324-5.41-.402-4.452-.137-7.214-.441-7.34-.816-.108-.332 3.5-1.938 7.243-3.219 1.25-.43 2.227-.781 2.172-.79-1.523-.163-6.008-.823-6.137-.901-.246-.153-.226-.75.035-1.008.707-.703-.82-2.063-2.617-2.332l-.922-.137.036-.91c.02-.5-.04-1.32-.125-1.824-.153-.899-.149-.914.476-1.13.344-.12.93-.218 1.3-.218.645 0 .7-.059 1.349-1.48.496-1.079.816-1.528 1.187-1.672.785-.297 1.61-.235 1.75.132.117.305.145.305.367.004.188-.254 1.051-.414 3.867-.718 1.996-.22 4.438-.399 5.426-.403.992-.004 2.774-.129 3.957-.277 2.305-.285 2.68-.25 2.684.254 0 .27.031.277.18.047.148-.235.382-.192 1.43.27 1.413.62 3.269 1.956 3.558 2.558.105.219.43.582.719.808.5.391.699.407 4.714.32 4.418-.093 4.508-.116 3.989-.976-.114-.187-.578-1.45-1.035-2.8l-.833-2.458-.738.063c-.758.066-.922-.098-.504-.516.332-.328.938-.293 1.075.059.062.164.23.297.37.297.141 0 .497.64.79 1.425.293.782.746 1.899 1.004 2.48.261.583.472 1.204.472 1.388 0 .804-.054.8 13.906.8 11.84 0 13.489-.035 13.875-.304.243-.168.438-.407.438-.528 0-.12.43-.847.957-1.613 2.066-2.996 2.074-3.027 1.926-5.285-.156-2.3-.496-4.469-.75-4.754-.098-.11-.684-.285-1.301-.394-.957-.168-1.137-.266-1.191-.649-.082-.582.285-1.023.855-1.023.242 0 .555-.133.691-.297.22-.266.27-.266.47 0 .21.281 1.175.41 1.972.265.562-.101.617.395.066.606l-.48.18.285 1.543c.156.843.367 1.62.465 1.726.097.102.18.57.18 1.04 0 1.066.562 2.183 1.718 3.413 1.211 1.293 2.567 1.809 4.793 1.836.926.008 1.766.07 1.875.133.11.062 2.285.105 4.836.094 4.63-.02 4.637-.02 4.7-.453.058-.41.171-.442 1.972-.493l1.914-.058-.691-.356c-.38-.195-1.38-.433-2.22-.53-.835-.099-1.726-.29-1.972-.43-.59-.337-8.285-.442-9.086-.126-.437.172-.617.157-.886-.082-.188-.164-.73-.363-1.211-.441-1.438-.234-2.153-.637-2.711-1.516-.285-.453-.582-1.05-.66-1.324-.157-.566.109-1.312.527-1.473.32-.12 4.086.41 8.746 1.243 1.79.32 4.23.722 5.426.898 4.05.59 4.492.684 4.879 1.031.89.805.886 1.504-.008 1.73-.508.126-.516.141-.145.411.211.152.68.277 1.043.277.563 0 .7.094.871.594.266.754.813 1.07 1.352.785.219-.117.395-.297.395-.402 0-.367.335-.184.562.312.285.621.621.457.621-.308 0-.918-.414-2.574-.66-2.64-.125-.032-.938-.29-1.805-.571-1.949-.63-4.836-1.34-7.695-1.895-1.195-.23-2.3-.46-2.453-.511-.8-.27 1.387-1.036 3.11-1.086l.722-.024-.75-.144c-1.215-.235-1.254-.473-.2-1.145.88-.558 2.821-1.418 3.204-1.418.09 0 .277.266.41.59.137.324.344.59.465.59.12 0 .754-.332 1.406-.735 1.027-.636 1.383-.742 2.617-.808 1.414-.074 1.43-.07 1.637.488.117.309.371.918.562 1.348 1.059 2.363 1.243 3.047 1.247 4.668 0 1.293.117 1.926.554 3.101.305.809.617 1.828.692 2.258.078.434.394 1.113.71 1.516.887 1.129.66 2.691-.519 3.59-.46.347-.687.683-.687 1.007 0 .735-.504 1.793-.973 2.043-.23.122-.965.196-1.633.164l-1.215-.058.04-1.281c.042-1.45-.048-1.653-.81-1.84-.515-.125-.542-.094-.574.61-.054 1.179.055 2.308.23 2.374.204.074-.663 1.02-.933 1.02-.113 0-.312-.133-.453-.297-.281-.34-.55-.29-2.195.433-.867.383-1.2.446-1.504.282-.348-.188-.402-.133-.512.523-.265 1.602-.207 1.746.782 1.992.992.25 7.558 2.68 7.746 2.871.21.207-.442.48-1.157.485-.379.004-1 .101-1.379.222-.378.122-1.843.293-3.253.387-3.274.211-4.09.344-4.383.715-.13.164-.656.379-1.168.473-.946.175-6.746.59-7.477.535-.215-.016-1.594-.094-3.058-.172zM21.62 47.555c-.066-.11-.254-.2-.418-.2-.16 0-.238.09-.172.2.067.105.254.195.418.195.164 0 .242-.09.172-.195zm-1.082-.59c0-.11-.098-.2-.21-.2-.114 0-.153.09-.087.2.067.105.16.195.207.195.051 0 .09-.09.09-.195zm1.973-1.465c0-.047-.09-.14-.2-.207-.109-.066-.195-.027-.195.086 0 .113.086.207.195.207.11 0 .2-.04.2-.086zm-6.547-1.043c.074-.535-.016-.543-.98-.098-.989.45-.962.676.078.602.695-.05.847-.137.902-.504zm66.933-.05c0-.29-.132-.391-.496-.391-.535 0-.62.183-.254.547.364.363.75.28.75-.157zm-19.945-.278c.164-.2.168-.313.012-.41-.262-.164-13.281-.137-13.711.027-.164.063-.297.238-.297.387 0 .41 13.652.406 13.996-.004zm1.29-.324c-.188-.301-.485-.207-.36.11.062.16.191.245.293.183a.214.214 0 00.066-.293zm-22.587-2.297c0-.082-.418-1.055-.926-2.16l-.93-2.012-2.57.105c-1.414.059-2.609.145-2.66.192-.047.05.22.09.586.094.371 0 .797.078.946.171.171.11-.387.223-1.528.313l-1.8.144.542.997c.297.55.82 1.293 1.157 1.652l.617.652h3.281c1.805 0 3.285-.066 3.285-.148zm21.649-.805c1.187-.984 3.328-3.324 3.18-3.473-.047-.046-.348-.007-.669.086-.316.098-.507.184-.421.192.09.008.101.113.03.23-.085.137-.25.086-.468-.148-.316-.34-.965-.36-12.098-.36-6.472 0-11.816.051-11.879.114-.14.14.993 3.527 1.274 3.804.195.2 6.75.395 15.719.47l4.183.034zm8.535.508c.097-.242.383-1.145.629-2 .336-1.188.383-1.582.195-1.645-.172-.054-.14-.16.11-.351.308-.23.023-.27-2.09-.274l-2.45-.007-4.632 4.718h4.027c3.992 0 4.031-.004 4.21-.441zm-43.211-4.887c0-.32-1.356-1.52-2.27-2.004-.843-.449-3.164-.593-4.332-.273-.773.215-.312.523.793.527 1.203.004 3.48.66 4.664 1.34 1.235.715 1.145.684 1.145.41zm45.766-.976c.203-.332.554-.735.785-.895.59-.414.527-.601-.364-1.05-.77-.395-1.718-1.723-2.507-3.516l-.313-.719-.348 1.125c-.382 1.234-1.25 2.875-2.296 4.34-.372.52-.622 1.027-.559 1.133.066.101 1.266.187 2.676.187h2.554zm3.324-.059c2.156-1.523 5.761-2.172 8.73-1.57.32.062.426.031.297-.09-.566-.547-3.648-.774-5.523-.41-.543.105-1.438.218-1.985.254-1.539.101-2.078.53-2.543 2.035-.183.586-.086.562 1.024-.219zm14.258-10.25c-.137-.16-.48-.293-.766-.289l-.516.008.493.281c.687.395 1.117.395.789 0zm-57.82 9.93c0-.235.34-.235.886 0 .332.14.289.172-.246.183-.352.008-.64-.074-.64-.183zm10.175-.43c-.043-.14-.129-.953-.195-1.8-.063-.848-.164-1.622-.223-1.72-.062-.097-.559-.18-1.102-.18-.542 0-1.16-.089-1.367-.202-.422-.227-.504-.973-.18-1.582.235-.434 2.743-1.754 3.333-1.754.215 0 .449-.098.523-.219.086-.14.469-.176 1.07-.094.79.102 1.18.02 2.493-.539 2.156-.918 4.476-1.652 5.996-1.902.703-.117 4.035-.266 7.398-.332 5.734-.113 6.137-.098 6.414.234.211.254.317.957.363 2.457.082 2.684.032 2.75-2.203 2.766-.886.008-3.035.047-4.77.086-1.737.043-5.866.133-9.175.203-3.617.07-6.113.203-6.258.32-.156.133-.261.942-.3 2.297l-.055 2.098-.84.058c-.563.04-.867-.023-.922-.195zm5.934-5.797c-.07-.504-.172-.96-.223-1.012-.188-.187-2.766 1.079-2.824 1.387-.074.371.347.477 2.011.516l1.16.027zm9.64.555l2.957-.129.153-1.063c.086-.582.101-1.113.039-1.18-.196-.19-3.047-.238-4.72-.073-1.554.152-1.573.16-1.753.793-.152.52-.328.68-.96.847-.99.266-2.392-.14-2.481-.715a14.284 14.284 0 00-.16-.851l-.102-.477-.367.602c-.203.328-.461.66-.578.73-.239.149-.297 1.535-.075 1.758.078.078 1.258.086 2.618.012 1.359-.07 3.8-.184 5.43-.254zm1.465-4.68c.047-.039-.824-.07-1.934-.07-1.277 0-1.976.07-1.898.195.11.176 3.617.063 3.832-.125zm6.274 8.457c-.188-.183.035-.465.367-.465.156 0 .285.133.285.297 0 .293-.418.403-.652.168zm15.386-8.156c-.199-.117-.539-.164-.758-.105-.445.113-.953-.028-.953-.27 0-.086.399-.406.887-.715.89-.562 1.18-.937.977-1.265-.063-.098-.239-.176-.395-.176-.156 0-.285-.09-.285-.2 0-.253.71-.25 1.195.008.438.23.496.801.145 1.364-.133.21-.168.453-.082.539.086.082.863.187 1.726.226 1.067.047 1.551.14 1.5.293-.14.426-3.324.664-3.957.301zm-5.164-.703c-.219-.055-.465-.164-.547-.242-.382-.36 1.532-1.368 2.618-1.38.39-.003.43.036.199.184-.164.102-.297.473-.297.832 0 .614-.035.645-.79.676-.433.016-.968-.015-1.183-.07zm-26.543-.262c0-.105.133-.191.297-.191.16 0 .297.035.297.078s-.137.125-.297.187c-.164.063-.297.028-.297-.074zm18.352-3.32c-.16-.09-.739-.363-1.281-.606-.95-.425-.97-.449-.5-.625.304-.113.64-.113.89.008.219.106.707.242 1.086.309.563.097.746.039 1.027-.328.293-.383.391-.41.696-.196.195.137.508.305.699.367.187.063.344.192.344.286 0 .289-.895.77-1.399.75a3.445 3.445 0 00-.87.093c-.216.059-.528.036-.692-.058zm0 0" />
        <path d="M76.234 50.898c-.789-.086-1.586-.222-1.773-.3-.191-.075-10.379-.172-22.645-.215-16.73-.055-22.468-.016-22.988.156-1.59.531-11.293.14-13.32-.535-.512-.172-2.223-.3-4.836-.36-3.723-.09-6.121-.355-6.113-.683 0-.191 1.336-.785 2.46-1.094a27.752 27.752 0 001.583-.48 24.202 24.202 0 015.425-1.27l2.07-.242.063-.746c.098-1.172-.195-1.363-1.305-.86-1.132.512-2.855.555-6.207.157-2.585-.313-2.953-.508-2.43-1.305.184-.277.278-.668.212-.871-.157-.492-2.11-1.578-2.836-1.578-.676 0-1.067-.379-.813-.79.196-.32.035-1.944-.23-2.28-.235-.301.215-.641 1.035-.778.371-.062.863-.148 1.094-.195.304-.059.601-.492 1.074-1.566.687-1.56.945-1.762 2.082-1.633.562.062.566.078.566 1.39 0 .73.051 1.328.114 1.328.062 0 .214-.546.34-1.214.124-.664.3-1.286.39-1.375.09-.09 1.27-.22 2.621-.29 1.352-.07 2.801-.25 3.223-.394.418-.145 1.515-.266 2.433-.266 1.54 0 1.68.036 1.782.418l.11.418.339-.449c.289-.379.664-.492 2.39-.715 1.126-.144 2.157-.222 2.294-.172.136.051.246.29.246.524 0 .41.015.414.375.09.363-.325.453-.301 2.023.445.906.434 1.953 1.102 2.324 1.488.66.684.668.707.313 1.098-.387.422-.258.824.136.43.329-.325.692-.29 1.094.113.317.312.625.332 3.305.195 1.629-.086 3.434-.101 4.012-.035.78.086 1.14.043 1.382-.172.258-.226.575-.254 1.461-.133.621.086 6.707.168 13.52.18 11.851.023 12.418.008 13.125-.352.406-.21.738-.3.738-.203 0 .098 1.254.176 2.785.176h2.785l.762-.836c.414-.46.758-.969.758-1.133.004-.16-.379-.523-.848-.808-.714-.43-1.011-.824-1.82-2.406-.531-1.043-1.07-1.895-1.2-1.895-.401-.004-.507-.773-.362-2.664.085-1.168.062-1.961-.075-2.211-.136-.258-.66-.508-1.547-.738-1.574-.41-1.714-.508-1.539-1.055.168-.523.696-.539.696-.02 0 .477.172.504.488.075.207-.282.32-.29.973-.055.965.348 1.07.5 1.316 1.871.113.637.332 1.43.48 1.758.153.332.227.793.168 1.027-.16.61.602 2.043 1.747 3.293.808.883 1.195 1.137 2.199 1.446 1.863.57 2.836.683 3.496.414.398-.168.656-.18.828-.04.145.122 2.184.239 4.98.297 4.133.082 4.81.051 5.293-.226.524-.3.575-.3.825.039.316.43 1.691.789 1.965.516.101-.106.437-.188.738-.188.64 0 .746-.45.238-1.004-.422-.465-.25-.676.598-.73.644-.043.707-.004.707.472 0 .575 1.191 2.325 1.722 2.528.211.082.434 0 .602-.223.145-.195.383-.332.535-.3.637.128.594-3.614-.047-4.333-.172-.187-.441-.344-.605-.344-.16 0-1.145-.273-2.188-.609-1.043-.336-3.523-.945-5.507-1.355-4.278-.883-4.532-1.004-2.868-1.391 1.403-.324 3.051-.207 4.063.285.8.39.937.414.933.14-.004-.57-.359-.89-1.02-.917-1.136-.051-2.53-.32-2.53-.488 0-.344 2.82-1.957 3.425-1.957.153 0 .387.269.524.593.137.328.324.64.418.7.094.058.57-.172 1.062-.508 1.29-.883 2.118-1.18 3.317-1.18h1.058l.559 1.23c.797 1.758 1.098 2.653 1.305 3.883.218 1.297.226 1.5.07 2.262-.082.41.031.934.375 1.703.273.613.644 1.676.82 2.363.18.684.54 1.524.801 1.868.656.867.598 2.918-.094 3.156-.633.222-1.207.914-1.207 1.453 0 1.45-1.07 2.293-2.59 2.039-.734-.125-.75-.148-.468-.55.164-.231.296-.626.296-.872 0-.25.11-.488.247-.527.996-.297 1.046-.364.394-.508-1.16-.262-1.492-.762-.918-1.395.43-.476.203-1.554-.332-1.554-.273 0-.379.14-.379.492v.488L96.86 37c-.46-.176-.96-.422-1.113-.54-.234-.179-.254-.085-.133.575.082.43.262 1.05.403 1.375.39.887.379 3.727-.02 4.05-.262.22-.355.204-.578-.1-.316-.434-1.172-.329-2.328.288-.426.227-1.024.375-1.367.344l-.618-.058-.242 1.671c-.133.918-.3 1.856-.37 2.086-.138.457-.067.493 1.878.993 1.863.472 2.82.632 4.047.66.894.023 1.059.066.68.183a6.159 6.159 0 00-.97.399c-.39.207-2.991.48-6.222.648-.644.035-.789.117-.789.438 0 .332-.219.433-1.383.648-1.644.309-9.453.469-11.5.238zm9.375-3.308c.696-.496 1.356-1.215 1.11-1.215-.293 0-1.25.473-1.254.621 0 .07-.38.191-.84.266-.46.078-.926.191-1.031.258-.469.277-2.867-.204-2.867-.57 0-.102-.133-.184-.293-.184-.364 0-.387-.414-.051-.774.203-.215.148-.238-.297-.133-.523.125-.75-.12-.344-.37.34-.212.215-.493-.222-.493-.364 0-.383-.043-.157-.316.223-.266.211-.352-.074-.563-.309-.222-.312-.273-.035-.504.203-.168.238-.297.098-.383-.282-.175.171-2.171.527-2.304a.441.441 0 00.258-.38c0-.155.133-.331.297-.394.16-.062.293-.246.293-.406 0-.184.117-.254.293-.184.175.067.378-.05.503-.28.118-.216.309-.333.43-.259.117.075.332-.023.477-.218.199-.274.32-.305.53-.13.298.247.532.114.532-.308 0-.39-1.246-.133-2.441.504-1.645.875-2.543 2.457-2.528 4.45.008 1.44.364 2.327 1.309 3.3.941.965 1.742 1.36 3.066 1.512 1.243.144 1.942.004 2.711-.543zm-61.57.43c.246-.067.445-.208.445-.313 0-.11-.14-.145-.308-.078-.34.129-1.91-.215-2.547-.559-1.29-.695-2.102-1.336-2.004-1.586.059-.156-.059-.32-.281-.39-.512-.164-.489-.418.058-.567l.446-.12-.493-.391c-.386-.301-.421-.387-.16-.391.45-.008.637-.355.367-.68-.164-.199-.144-.293.094-.383.211-.078.274-.25.192-.515-.09-.277-.035-.395.183-.395.176 0 .309-.164.309-.39 0-.219.09-.395.2-.395.105 0 .194-.133.194-.293 0-.164.176-.297.395-.297.234 0 .394-.129.394-.316 0-.223.122-.29.395-.215.242.063.465-.02.574-.215.149-.261.23-.273.485-.062.168.136.48.195.691.129.215-.067.445-.032.516.082.07.113.289.203.488.203.2 0 .414.133.476.297.063.164.293.293.516.293.219 0 .398.129.398.285 0 .152.18.336.399.406.219.07.344.215.277.32-.066.106.024.352.2.547.175.196.265.489.203.657-.067.167-.02.363.101.437.16.102.156.215-.015.422-.313.375.093.867.433.527.309-.308-.14-2.304-.719-3.222-1.464-2.309-5.043-2.668-7.082-.711-1.332 1.277-1.652 3.101-.902 5.101.41 1.094 1.516 2.344 2.371 2.68.559.223 2.047.273 2.711.098zm1.434-.653c0-.101-.09-.238-.2-.304-.109-.067-.195.015-.195.183 0 .168.086.309.195.309.11 0 .2-.086.2-.188zm31.375-.582c8.105-.004 13.422-.41 13.422-1.027 0-.094-3-.18-6.66-.188-3.665-.008-10.926-.043-16.133-.074-5.211-.031-10.34-.016-11.399.035l-1.922.094.676.457c.762.516 1.39.555 12.445.8 3.149.071 5.75.153 5.782.18.035.028.39-.023.789-.113.402-.09 1.754-.164 3-.164zm-30.391-.008c0-.226-.824-.824-.957-.695-.117.117.566.883.793.883.09 0 .164-.086.164-.188zm-2.348-.906c1.16-.535 1.258-.605 1.5-1.098.192-.386.184-.73-.047-1.699-.378-1.633-.87-2.11-2.18-2.11-1.226 0-2.347.743-2.609 1.731-.183.692.149 2.305.582 2.828.567.68 1.707.825 2.754.348zm-1.89-1.457c-.063-.102-.012-.355.117-.559.352-.562.062-1.484-.426-1.355-.445.117-.496-.195-.11-.7.364-.48.973-.456.817.032-.086.262.043.492.43.785.95.707 1.055.824.93 1.028-.07.109.039.32.242.464.515.375.168.614-.43.297-.383-.207-.55-.21-.73-.035-.282.281-.68.3-.84.043zm1.965-1.59c-.188-.3.066-.496.32-.246.144.14.144.254.012.336a.245.245 0 01-.332-.09zm3.011 3.012c.078-.23-.691-.555-.879-.371-.164.164.364.738.602.656a.487.487 0 00.277-.285zm58.055-.383c.262-.238.508-.637.543-.887.328-2.324.34-2.238-.36-2.949-1.57-1.594-2.55-1.765-3.617-.644-.832.882-1.289 1.836-1.28 2.675.007.766.304 1.215 1.218 1.844.894.617 2.789.594 3.496-.039zm-2.55-1.777c-.536-.098-1.032-.45-.63-.45.13 0 .414-.175.63-.39.566-.566 1.382-.531 1.382.059 0 .484-.344.937-.68.894-.113-.012-.43-.066-.703-.113zm4.64 2.11c.066-.11.027-.2-.09-.2a.204.204 0 00-.207.2c0 .105.039.194.086.194.047 0 .14-.09.21-.195zm-59.766-.895c.156-.414-.02-.547-.52-.387-.335.105-.374.187-.187.41.301.363.559.356.707-.023zm60.258-.07c0-.208-.488-.415-.953-.407-.285.004-.277.047.055.293.425.324.898.383.898.113zm-23.719-.317c.145-.055.235-.293.2-.54l-.063-.44-7.797-.016c-6.543-.012-7.93.035-8.633.289-.98.351-.992.668-.035.808.84.122 15.973.028 16.328-.101zm2.407-.293c0-.11-.09-.195-.2-.195a.193.193 0 00-.195.195c0 .11.086.195.195.195.11 0 .2-.086.2-.195zm21.546-2.316c-.277-1.325-.87-2.243-1.894-2.922-.824-.547-2.465-.91-2.203-.485.082.13.316.18.527.114.238-.079.418-.012.492.175.063.164.23.254.371.2.141-.055.5.125.797.402.473.437.508.543.274.828-.243.29-.223.309.172.184.441-.141.625.144.242.379-.336.207-.215.492.21.492.391 0 .395.015.067.343-.332.329-.32.348.23.461l.579.114-.555.23c-.598.242-.55.621.074.621.531 0 .48.352-.062.43-.563.078-.512.418.09.566.656.16.894-.699.593-2.132zm-72.68-.786c.02-.39-.046-.43-.523-.316-.297.07-.656.219-.797.332-.14.11-1.007.188-1.925.176-.954-.016-1.668.054-1.668.164 0 .105.066.191.148.195.082.004.95.133 1.926.281 1.746.27 1.781.266 2.117-.152l.34-.43.023.59c.024.578.028.582.184.098.086-.27.164-.692.176-.938zm16.493.551c.187-.297-1.586-3.496-1.813-3.273-.046.047.133.511.399 1.035.262.527.586 1.285.719 1.691.238.73.468.914.695.547zm9.89-.031c.098-.164 1.387-.188 4.7-.098 2.508.07 6.976.18 9.937.242l5.38.114.835-.496c.945-.559 4.438-3.985 4.25-4.172-.148-.145-26-.114-26.234.031-.094.055-.09.254.004.434.093.183.226.597.3.921.102.47.012.383-.421-.39l-.547-.985-3.551.067c-1.953.035-3.7.105-3.887.156-.41.113-.25.555.89 2.383 1.259 2.02 1.247 2.016 4.99 2.016 2.187 0 3.26-.07 3.355-.223zm29.95-.027c.187-.137.504-.868.707-1.622.199-.753.5-1.742.668-2.19.164-.45.25-.872.183-.935-.062-.062-1.261-.117-2.664-.117h-2.547l-2.304 2.383c-1.266 1.309-2.332 2.457-2.367 2.555-.11.293 7.917.222 8.324-.074zm4.136-3.934c.743-1.262 2.461-2.75 3.747-3.238 3.722-1.422 8.125-.832 10.109 1.355.89.985 1.793 2.852 2.062 4.281.114.586.247 1.11.301 1.164.555.551 0-2.57-.722-4.078-.243-.5-.985-1.445-1.657-2.105-1.367-1.348-2.148-1.695-4.636-2.059-1.633-.238-4.434-.101-4.641.227-.059.101-.492.18-.957.18-1.766 0-1.969.183-3.363 2.98-1.211 2.43-1.887 4.23-1.883 5.016.004.199.258-.36.566-1.243.309-.882.793-2 1.074-2.48zm-64.988 2.61c0-.106-.039-.196-.086-.196-.05 0-.144.09-.21.195-.067.11-.028.2.085.2.117 0 .211-.09.211-.2zm1.281 0c.07-.106-.011-.196-.171-.196-.165 0-.352.09-.418.195-.067.11.011.2.171.2.165 0 .352-.09.418-.2zm82.278.023c.062-.098-.016-.54-.172-.977-.156-.441-.234-1.101-.176-1.469.125-.765-.277-1.066-.953-.707-.297.16-.363.325-.262.641.075.234.254.91.399 1.508.14.594.265 1.101.273 1.129.047.133.797.027.89-.125zm-88.383-.633c.074-.117.34-.172.598-.125.46.09.46.086.125-.488-.235-.395-.36-.48-.403-.274-.035.164-.37.414-.75.551-.562.203-.625.27-.332.387.508.199.61.191.762-.051zm3.047-.164c0-.102-.09-.242-.2-.309-.105-.066-.195.02-.195.188s.09.304.196.304c.109 0 .199-.082.199-.183zm1.62-.836c-.265-.266-.51.152-.343.586.121.309.145.309.336-.027.133-.239.137-.43.008-.559zm2.13.43c0-.106-.04-.196-.086-.196-.05 0-.145.09-.211.196-.066.109-.027.199.086.199.117 0 .21-.09.21-.2zm-.988-1.047c0-.559-.149-.73-.512-.59-.34.129-.356.496-.04.812.36.36.552.282.552-.222zm17.164-1.278c-.45-.925-1.739-2.113-2.828-2.605-1.516-.688-5.247-.363-6.145.535-.176.172-.285.344-.246.383.039.039.73-.004 1.539-.094 2.848-.316 5.516.387 7.289 1.926.383.328.707.598.723.602.02.003-.133-.333-.332-.747zm46.578-1.214c0-.11-.094-.196-.211-.196-.113 0-.153.086-.086.196.066.109.16.195.21.195.048 0 .087-.086.087-.195zm22.426-.098c.164-.164.55-.297.863-.297 1.012 0 .988-.746-.028-.871a7.993 7.993 0 01-.738-.133c-.379-.105-1.02 1.031-.765 1.352.25.312.308.308.668-.051zm-4.977-.07c.285-.461-1.344-1.16-1.809-.778-.21.18-.156.29.286.582.582.383 1.343.48 1.523.196zm.605-9.075c.07-.105-.066-.195-.293-.195-.23 0-.363.09-.296.195.066.11.199.2.296.2.094 0 .227-.09.293-.2zm-54.27 8.606c-.894-2.488-1.476-4.344-1.394-4.426.059-.058.16.063.23.266.114.34 1.47 3.883 1.626 4.25.039.086-.031.152-.153.152-.12 0-.261-.11-.308-.242zm29.618-.445c.598-1.004 1.715-2.653 1.8-2.653.173 0-1.05 2.016-1.589 2.613l-.562.63zm-24.414-.344c-.133-.242-.293-1.063-.355-1.817l-.11-1.379-1.25-.136c-1.773-.196-2.207-.684-1.5-1.692.36-.507 2.446-1.613 3.047-1.613.227 0 .633-.144.902-.32.422-.278.567-.285.98-.067.438.23.735.157 3-.742 1.388-.55 3.005-1.137 3.602-1.3 1.512-.415 3.868-.61 4.036-.34.18.289 4.902.273 5.93-.02.437-.125 1.82-.258 3.077-.3 1.868-.063 2.329-.024 2.532.222.144.172.293 1.105.351 2.223.137 2.683.219 2.613-3.176 2.753l-2.73.118.113-.575c.192-.96.219-1.937.059-2.195-.188-.305-5.688-.34-6.258-.039-.219.117-.379.41-.379.695 0 .621-.762.942-1.926.813-1.078-.117-1.43-.422-1.43-1.242 0-.461-.093-.664-.296-.664a.297.297 0 00-.297.297c0 .16-.223.484-.492.722-.414.356-.48.563-.422 1.281.055.641-.008.899-.246 1.024-.617.316-.91-.031-.969-1.156-.035-.59-.094-1.11-.137-1.149-.039-.039-.765.223-1.617.586-1.187.508-1.543.75-1.543 1.05 0 .267.156.415.492.466.403.062.332.117-.394.297l-.887.218-.227 2.164a88.535 88.535 0 01-.246 2.211c-.011.028-.242.047-.507.047a.829.829 0 01-.727-.441zm-8.16-4.278c.066-.105.25-.195.406-.195.156 0 .285.09.285.195 0 .11-.183.2-.406.2-.227 0-.352-.09-.285-.2zm53.789-.183c-.445-.383-.707-.406-5.063-.406-2.851 0-4.644.074-4.718.199-.184.289-.887.238-1.008-.078-.063-.164-.555-.332-1.227-.414-.617-.078-1.347-.258-1.629-.403-.535-.273-1.46-1.523-1.605-2.168-.11-.48.363-1.46.703-1.46.879 0 5.598.769 11.574 1.886 1.207.227 5.848.86 6.348.863.328.004 1.348 1.059 1.348 1.391 0 .457-1.153.805-2.512.754-.52-.02-1.121.027-1.344.105-.27.09-.55.004-.867-.27zm-30.258-.156c.461-.04 1.219-.04 1.68 0 .46.043.082.074-.84.074-.922 0-1.3-.031-.84-.074zm23.043-4.766c-.082-.129-.398-.164-.808-.09-.918.172-.848-.113.214-.855.551-.39.887-.774.887-1.024 0-.445.492-.543.652-.125.059.149-.023.516-.18.82-.3.579-.21.794.376.907.195.035.375.156.394.262.055.273-1.37.367-1.535.105zm2.582.027c-.133-.215.317-.425.902-.425.227 0 .36.105.313.246-.098.297-1.055.441-1.215.18zm-7.617-.707l-.691-.25.69-.422c.38-.23.825-.421.99-.421.32 0 .84.933.671 1.207-.144.23-.836.187-1.66-.114zm-8.29-3.656a10.215 10.215 0 00-.937-.394c-.351-.133-.64-.325-.64-.434 0-.106.152-.129.344-.047.19.078.746.223 1.234.32.777.157.93.13 1.215-.222.402-.489.48-.492 1.07-.028.36.282.414.418.23.563-.335.265-2.152.437-2.515.242zm0 0" />
        <path d="M78.16 50.89c-1.465-.078-3.023-.238-3.46-.359-1.235-.34-44.712-.367-46.563-.027-.98.18-2.45.219-5.035.133-4.489-.145-6.762-.422-7.793-.953-.606-.313-1.008-.38-1.727-.293-.516.058-.937.078-.937.039 0-.035.59-.352 1.316-.7.926-.445 1.601-.632 2.27-.632.523 0 .953-.075.953-.168 0-.09-.172-.594-.38-1.117a10.639 10.639 0 01-.515-1.88c-.078-.507-.219-.972-.316-1.035-.098-.058-.668.075-1.266.297-1.234.461-2.523.508-5.387.203-3.058-.328-3.187-.359-3.187-.777 0-.203.086-.426.195-.492.11-.066.2-.379.2-.695 0-.473-.141-.649-.774-.97-.422-.214-.8-.484-.84-.597-.035-.113-.535-.258-1.101-.328-.57-.066-1.036-.184-1.036-.266 0-.261.57-.62.782-.492.113.07.293.07.406.004.297-.187-.106-.781-.531-.785-.247 0-.383-.172-.422-.543-.051-.434.015-.539.343-.539.438 0 .563-.309.176-.438-.414-.136.043-.546.61-.546.703 0 1.16-.512 1.804-2.024.453-1.066.594-1.226 1.188-1.355 1.129-.242 1.222-.125 1.137 1.422-.075 1.3-.055 1.378.32 1.328.265-.04.422-.227.457-.551.156-1.438.273-1.816.492-1.598.121.121.55.223.953.223.637 0 .719.05.63.39-.056.22-.048.395.019.395.148 0 2.504-1.238 3.574-1.879.68-.406 1.043-.472 2.578-.476 1.77-.004 1.789 0 1.992.539l.207.539.215-.524c.246-.601.426-.675 2.309-.941 2.062-.297 2.468-.27 2.468.152 0 .551.227.66.621.305.329-.297.457-.277 1.832.324 1.5.66 3.231 2.113 2.727 2.297a.408.408 0 00-.246.36c0 .558-.371.44-1.254-.403-1.512-1.445-2.305-1.766-4.371-1.762-2.371 0-3.652.414-5.348 1.715-1.543 1.192-2.261 2.13-2.87 3.754-.29.77-.575 1.203-.872 1.316-.242.09-.5.258-.57.375-.074.114-.574.208-1.117.208-.61 0-.942-.075-.868-.196.07-.11.297-.195.512-.195.582 0 .668-.5.356-2.047l-.282-1.395-2.656-.117.004 1.63c0 .898.086 1.765.191 1.929.149.23.067.312-.406.39-.328.055-.594.188-.597.297 0 .168 2.37.68 5.285 1.145l.804.129.223-1.488c.313-2.098.871-3.258 2.102-4.38 1.308-1.19 2.8-1.667 5.222-1.667 2.469.004 4.02.566 5.602 2.039 1.265 1.183 2.07 2.43 2.496 3.867.27.902.625 1.172.984.742.184-.223.086-.535-.46-1.512-.383-.68-1.012-1.632-1.4-2.12-.835-1.048-.866-1.352-.194-1.84.492-.356.507-.356.87.035.36.379.54.39 4.673.285 2.367-.059 4.343-.164 4.398-.23.055-.063 4.895-.075 10.758-.02 5.86.054 12.164.043 14.012-.024 1.843-.07 4.738-.129 6.43-.136 3.054-.016 3.081-.02 3.402-.504l.32-.485 1.21 1.125-.624 1.235c-.723 1.425-1.356 3.215-1.363 3.851-.008.817.359.457.69-.676.485-1.664 1.583-3.703 2.462-4.582 2.426-2.418 7.586-3.113 10.867-1.464 1.719.859 3.098 2.941 3.602 5.433.136.668.347 1.246.472 1.29.43.14.668-.665.469-1.56-.254-1.113-.125-1.183.227-.124.254.765.351.855.972.91.961.082 1.188-.254.844-1.242-.152-.43-.227-1.063-.164-1.403.21-1.152-.125-1.422-1.844-1.488-1.27-.047-1.539-.113-1.594-.402-.054-.29.09-.344.887-.348.524 0 1.07-.078 1.219-.168.691-.437-1.016-1.594-1.93-1.309-.21.07-.547.043-.742-.058-1.156-.594-2.922-1.043-5.562-1.422-1.325-.191-1.938-.188-3.06.016-.772.14-1.503.332-1.624.421-.121.09-.48.114-.8.051-.974-.195-1.95.352-2.65 1.489l-.62 1.007-.473-.437c-.434-.406-.445-.477-.172-.89.434-.657.379-.81-.457-1.235-.809-.41-1.406-1.192-2.39-3.133-.34-.672-.794-1.395-1.004-1.61-.653-.648-.426-2.55.3-2.55.211 0 .278.226.25.855-.074 1.727 2.059 4.348 4.024 4.946 1.433.441 3.164.593 3.664.324.316-.168.46-.152.648.074.203.242 1.063.29 5.156.29 3.532 0 5.02-.067 5.297-.24.32-.198.434-.183.641.083.313.402 1.512.734 2.191.605.43-.082.528-.011.633.465.07.309.258.918.422 1.348.168.433.375 1.297.465 1.918.086.62.312 1.418.496 1.77.25.472.328 1.05.3 2.21-.042 1.703-.26 2.203-.706 1.606-.258-.352-.305-.352-1.317-.02-.578.188-1.254.477-1.5.637-.359.23-.554.246-.945.07-.582-.265-.574-.281-.855 1.621a8.266 8.266 0 01-2.012 4.325c-.445.504-.762 1.035-.703 1.183.152.399-1.293.711-4.211.914-1.356.094-2.598.16-2.762.149-.164-.016-1.496-.086-2.96-.164zm-41.828-2.456c.281-.258.719-.278 2.973-.133 1.457.09 2.832.097 3.062.02.23-.083.762-.071 1.188.023 1.093.246 1.765.25 11.125.086 10.515-.18 11.812-.184 12.597-.028.594.118.676.063 1.227-.804.398-.625.894-1.082 1.504-1.391.687-.348.844-.504.637-.637-.153-.097-5.028-.175-10.836-.18-9.528-.007-11.922-.109-10.848-.472.16-.05 3.629-.133 7.71-.176 4.083-.043 7.524-.144 7.65-.219.296-.183.288-.84-.012-1.027-.13-.078-3.746-.125-8.04-.098-8.331.047-9.355.145-9.246.891.032.23.23.438.454.473.214.031.523.105.683.156 1.004.34-1.05.469-7.691.48-5.817.012-7.317.063-7.012.25.711.426 1.543 1.403 1.922 2.247.414.93.476.964.953.539zm49.367-.743c2.219-1.804 3.024-3.625 2.563-5.812-.785-3.746-5.153-5.176-8.11-2.652-2.316 1.972-2.445 5.847-.257 7.757.918.805 1.843 1.184 3.3 1.356.649.078 1.246.152 1.325.168.074.015.609-.352 1.18-.817zm-2.078-.859c-.203-.203-.156-.852.059-.852.175 0 .597.614.597.872 0 .152-.496.14-.656-.02zm.856-.262c0-.11.09-.199.195-.199.11 0 .2.09.2.2a.2.2 0 01-.2.195.198.198 0 01-.195-.196zm.726-.336c-.058-.09.113-.37.375-.625.262-.25.477-.355.477-.234 0 .324-.727 1.059-.852.86zm-4.43-.488a.558.558 0 01.313-.312c.144-.047.187.043.113.234-.136.355-.547.434-.426.078zm-.64-.32c0-.239.375-.516.512-.38.05.052-.043.204-.211.34-.188.153-.301.169-.301.04zm5.922-.75c0-.262.054-.274.297-.074.164.136.296.28.296.32 0 .039-.132.074-.296.074-.165 0-.297-.144-.297-.32zm-6.157-.207c.145-.059.317-.051.38.015.066.067-.051.114-.258.102-.23-.008-.278-.055-.122-.117zm6.454-.457c-.067-.106-.028-.196.085-.196.118 0 .211.09.211.196 0 .11-.039.199-.09.199-.046 0-.14-.09-.206-.2zm-6.809-.196c0-.109.137-.195.309-.195.168 0 .25.086.183.195-.066.11-.203.196-.308.196-.102 0-.184-.086-.184-.196zm3.238-.468c-.172-.438.074-.711.637-.711.398 0 .48.086.43.441-.075.527-.891.734-1.067.27zm3.668-.121c0-.11.09-.196.2-.196a.196.196 0 010 .39c-.11 0-.2-.085-.2-.194zm-6.804-.399c.066-.11.207-.148.304-.086.278.168.223.29-.12.29-.173 0-.255-.09-.184-.204zm.003-.57c-.062-.102-.023-.238.09-.309.11-.066.2-.293.2-.504 0-.21.09-.383.195-.383.11 0 .199-.132.199-.292 0-.165.133-.297.297-.297.16 0 .297-.137.297-.309 0-.187.133-.285.34-.242.441.082.59.75.168.75-.172 0-.313.133-.313.293 0 .164-.09.297-.195.297-.11 0-.2.133-.2.293 0 .164-.09.297-.195.297-.11 0-.199.132-.199.293 0 .324-.5.406-.684.113zm6.606-.606c0-.105.086-.195.195-.195.11 0 .2.09.2.195a.2.2 0 01-.2.2.197.197 0 01-.195-.2zm-.344-.722c.184-.184.387-.278.457-.211.192.191-.105.543-.465.543-.3 0-.3-.028.008-.332zm-.644-.352c0-.156.175-.383.394-.496.305-.164.395-.152.395.05 0 .29-.383.735-.633.735-.086 0-.156-.129-.156-.289zm-.594-.277c0-.207-1.305-.504-1.875-.43-.215.031-.45.145-.52.254-.164.262-.562.016-.562-.352 0-.156.16-.28.355-.28.196 0 .45-.098.567-.216.156-.156.254-.152.355.008.102.164.215.16.43-.02.234-.19.328-.19.453.012.11.18.195.192.293.04.2-.32.504-.266.504.09 0 .218.117.269.394.183.45-.145.547.262.16.648-.28.278-.554.309-.554.063zM25.078 47.93c3.203-1.446 3.902-5.293 1.422-7.84-1.035-1.063-1.867-1.383-3.582-1.383-4.332-.008-6.11 5.344-2.824 8.508.426.41 1.031.824 1.347.918 1.047.312 2.696.219 3.633-.203zm.524-2.082c-.07-.07-.13-.258-.13-.418 0-.23.055-.239.294-.04.164.133.297.32.297.419 0 .203-.274.226-.461.039zm.394-.785c-.226-.227-.144-.461.164-.461.164 0 .297.132.297.296 0 .305-.234.391-.46.164zm-6.05-.657c.144-.265.144-.394.007-.394-.113 0-.207-.137-.207-.309 0-.191.133-.281.348-.234.191.043.316.195.285.34a.417.417 0 00.172.41c.324.199.043.582-.426.582-.328 0-.36-.063-.18-.395zm6.261-.148c-.039-.082-.09-.399-.11-.707-.038-.672-.597-1.914-.992-2.211-.16-.121-.222-.32-.148-.442.2-.316.711-.285.711.043 0 .153.187.32.422.383.27.07.379.215.305.403-.063.164-.008.328.125.37.335.114.351 2.31.015 2.31-.137 0-.285-.067-.328-.15zm-3.5-.738c0-.528.52-.68.934-.27.332.332.074.762-.461.762-.371 0-.473-.102-.473-.492zm-2.96-.688c0-.105.136-.195.296-.195.164 0 .297.09.297.195 0 .11-.133.2-.297.2-.16 0-.297-.09-.297-.2zm.296-.785c-.066-.11.012-.195.176-.195.16 0 .351.086.418.195.066.11-.012.195-.176.195-.16 0-.352-.086-.418-.195zm.586-.602c-.074-.117-.082-.258-.027-.316.144-.14.527.11.527.34 0 .25-.34.234-.5-.024zm.516-.46c-.16-.192-.168-.32-.024-.407.274-.172.602.047.602.399 0 .359-.282.363-.578.007zm.707-.25c-.262-.262-.122-.676.214-.622.192.032.461-.015.602-.105.145-.09.379-.055.543.078.203.168.285.176.285.02 0-.122.133-.223.297-.223.164 0 .297.094.297.21 0 .122.168.157.394.087.313-.098.395-.035.395.297 0 .37-.074.406-.617.285-.946-.207-1.75-.23-1.75-.055 0 .191-.473.211-.66.027zm44.753 3.69c.145-.23-.074-.804-.304-.804-.098 0-.176.219-.176.488 0 .489.266.66.48.317zM37.707 43.5c0-.164-.09-.242-.195-.176-.11.067-.2.254-.2.418 0 .16.09.238.2.172.105-.066.195-.254.195-.414zm-4.145-1.762c0-.168-.09-.25-.195-.183-.11.066-.199.207-.199.308 0 .102.09.184.2.184.105 0 .194-.137.194-.309zm37.7.207c.683-.148 1.031-.715 1.34-2.168.117-.543.398-1.422.625-1.949.324-.758.359-.992.16-1.121-.375-.234-5.051-.203-5.5.04-.258.136-4.645.206-13.063.206-12.875 0-22.172.184-22.601.445-.266.168.109 1.004 1.257 2.793 1.086 1.692 1.079 1.688 5.145 1.594 1.938-.047 3.61-.11 3.719-.137.11-.023 4.597.02 9.976.106 7.414.113 9.887.094 10.22-.082.343-.184.491-.18.694.023.282.282 6.938.492 8.028.25zm2.34-1.289c-.317-.195-.461-.09-.282.2a.255.255 0 00.34.09c.133-.083.11-.184-.058-.29zm-66.375-.468c.37-.782.234-2.227-.227-2.403-.152-.058-.273-.273-.273-.48 0-.442-.258-.48-.586-.086-.13.156-.516.308-.86.343-.578.055-.633.122-.691.848-.035.43.043 1.113.176 1.512.242.738.312.773 1.8.914.207.02.461-.23.66-.648zm2.023-.711c.063-.922-.324-1.723-.715-1.48-.203.124-.152 1.5.082 2.25.172.55.578.058.633-.77zm6.914-3.403l.063-.566-.95.144c-1.113.164-1.25.23-1.25.59 0 .363.348.48 1.282.438.71-.035.796-.094.855-.606zm82.613 4.844c.168-.914.184-.93 1.371-1.215 1.204-.289 1.426-.11 1.028.844-.32.766-.914 1.105-1.934 1.105-.586 0-.597-.015-.465-.734zm-.043-2.023c-.511-.208-.527-.31-.144-.977.418-.73.367-1.52-.113-1.777-.856-.457-.27-.758 2.14-1.106 1.102-.156.977-.539-.203-.617-.496-.035-.945-.164-.992-.297-.05-.129-.047-.746.008-1.375.097-1.14.097-1.14.664-1.016.543.118.566.094.582-.628l.015-.754.371.785c.204.433.52 1.363.708 2.066.187.703.593 1.602.898 1.992.309.395.559.883.555 1.082 0 .825-.434 1.868-.848 2.055-.238.11-.652.324-.926.48-.547.313-2.027.36-2.715.087zm-2.218-4.125c0-.364.054-.418.238-.235.183.184.183.29 0 .473-.184.183-.238.129-.238-.238zm-51.79-.829c-.171-.246-.308-.843-.308-1.363 0-.512-.086-1.152-.191-1.43-.176-.464-.29-.507-1.368-.507-1.449 0-1.87-.313-1.574-1.16.235-.672 2.16-1.79 3.086-1.79.324 0 .703-.132.836-.293.297-.355.855-.378 1.367-.062.305.191.645.117 1.918-.418 3.414-1.434 5.313-1.977 6.828-1.953 4.317.062 11.325-.078 11.489-.238.101-.098.511-.18.91-.18.656 0 .738.058.847.613.227 1.117.145 3.848-.12 4.059-.137.11-1.36.23-2.716.27l-2.464.073v-1.355c0-1.262-.036-1.363-.496-1.543-.48-.184-5.485-.031-6.047.184-.145.054-.266.3-.266.547 0 .562-.309.82-1.187.98-.723.137-1.758-.145-2.012-.547-.082-.129-.153-.52-.153-.871-.003-.437-.097-.64-.3-.64a.289.289 0 00-.297.28c0 .153-.219.544-.492.864-.352.418-.493.816-.493 1.398 0 .555-.097.848-.308.93-.485.184-.688-.172-.735-1.277-.05-1.219-.12-1.235-2.023-.438-1.238.52-1.379.637-1.437 1.18-.036.351-.176.601-.333.601-.425 0-.511.278-.703 2.282-.097 1.031-.226 1.957-.293 2.058-.195.317-.648.2-.964-.254zm50.54-2.25c-.075-.074-.133-.285-.133-.472 0-.383.52-.66.699-.371.14.23-.387 1.02-.566.843zm-4.72-2.164c-.265-.265-.968-.328-4.327-.382-2.203-.04-4.332-.114-4.727-.168-.496-.07-.793-.012-.96.191-.317.379-.915.379-1.06 0-.077-.203-.406-.297-1.058-.305-1.203-.008-2.039-.46-2.805-1.511-.68-.942-.695-1.012-.363-1.735.234-.515.258-.52 1.625-.387 2.746.266 10.172 1.622 12.004 2.192.605.187 1.254.246 1.805.164 1.77-.266 4.058.578 4.058 1.496 0 .457-.765.621-2.183.461-.746-.082-1.262-.055-1.43.086-.191.16-.34.133-.578-.102zm9.606-.093c-.215-.372-1.523-.918-3.734-1.559-2.047-.598-2.863-.93-2.863-1.168 0-.105.187-.195.414-.195.664 0 .316-.48-.43-.59-.484-.07-.691-.207-.73-.492-.059-.426 1.273-1.399 3.707-2.703 2.125-1.141 2.074-1.145 2.722.285 1.41 3.093 1.82 4.984 1.34 6.152-.203.492-.27.535-.426.27zm-9.754-3.016c-1.14-.25-2.406-.508-2.812-.582-1.004-.172-.93-.414.2-.637 1.5-.293 3.202-.047 4.296.63 1.016.628 1.344 1.089.75 1.058-.2-.012-1.293-.223-2.434-.469zm-7.406-1.883c-.074-.117-.402-.16-.754-.094l-.62.114.491-.344c.274-.191.746-.594 1.051-.89.309-.301.598-.544.64-.544.208 0 .055.567-.21.785-.422.352-.367.575.2.79.269.101.491.23.491.289 0 .195-1.16.101-1.289-.106zm3.028.074c.144-.058.312-.05.378.016.067.066-.05.113-.257.102-.23-.008-.278-.055-.121-.118zm4.082-.207c-1.047-.148-.954-.39.46-1.215 1.934-1.125 1.934-1.125 2.29-.437.171.328.308.64.308.7 0 .054-.383.323-.855.597-.844.492-1.032.523-2.203.355zm-11.989-.382c-.511-.137-.418-.38.254-.657.531-.218.633-.203.883.125.156.203.285.438.29.52.007.152-.845.16-1.427.012zm-7.836-.75c-.699-.25-.96-.567-.632-.766.3-.188 1.406.281 1.62.687.239.438.051.454-.988.079zM68.2 20.027c-.066-.105 2.746-.183 2.871-.418l.227-.418.422.422c.367.364.383.45.129.61-.383.246-3.496.047-3.649-.196zm0 0" />
      </g>
      <path
        d="M47.441 45c-1.316-.879-.87-1.281.16-1.523l16.192-.16c1.434.265 1.437.859.078 1.765zm0 0"
        fillRule="evenodd"
      />
      <path
        fill="#CCC"
        d="M78.66 18.816h.2a1.39 1.39 0 011.394 1.391v3.773a1.386 1.386 0 01-1.395 1.387h-.199c-.183 0-.363-.035-.531-.105a1.314 1.314 0 01-.453-.301 1.347 1.347 0 01-.305-.45 1.386 1.386 0 01-.105-.53v-3.774a1.371 1.371 0 01.41-.984c.129-.13.281-.23.453-.301.168-.07.348-.106.531-.106"
      />
      <path
        fill="#8F8F8F"
        d="M70.355 23.648h.997c.675 2.493.84 5.207 2.66 7.215l2.258 1.653-2.125 3.773-6.18.133 3.387-5.492zm0 0"
        fillRule="evenodd"
      />
      <path
        fill="#B2B2B2"
        d="M37.262 30.145l14.074-6.32 18.871-.325c.824 2.43 1.012 4.863.977 7.293-1.954 3.883-4.723 7.68-8.625 11.348l-20.82-.164zm0 0"
        fillRule="evenodd"
      />
      <path
        fill="#939393"
        d="M37.184 30.063L8.063 33.468v8.347l6.671 1.297c.793-5.812 3.188-6.37 5.45-7.375 3.636-.422 5.78.485 7.484 1.782 1.934 1.503 2.289 3.324 3.254 5.023l10.898-.324zm0 0"
        fillRule="evenodd"
      />
      <g clipPath="url(#prefix__i)">
        <path
          fill="#1A1A1A"
          d="M1.96 40.84l11.388.488v-4.457l-11.711.484c.18.946.355 1.907.324 3.485zm0 0"
          fillRule="evenodd"
        />
      </g>
      <g clipPath="url(#prefix__j)">
        <path
          transform="matrix(.19929 0 0 .19857 1.518 .397)"
          fill="none"
          d="M2.222 203.673l57.137 2.459v-22.446l-58.763 2.44c.901 4.76 1.783 9.6 1.626 17.547zm0 0"
          stroke="#000"
        />
      </g>
      <path
        transform="matrix(.19929 0 0 .19857 1.518 .397)"
        fill="none"
        d="M365.486 182.466l-222.02 2.026"
        stroke="#000"
        strokeWidth={2.023}
      />
      <g clipPath="url(#prefix__k)">
        <g clipPath="url(#prefix__l)">
          <path
            fill="url(#prefix__m)"
            d="M37.262 23.5H71.18v18.805H37.262zm0 0"
            fillRule="evenodd"
          />
        </g>
      </g>
      <path
        transform="matrix(.19929 0 0 .19857 1.518 .397)"
        fill="none"
        d="M179.356 149.397l22.463 61.633h104.06c22.248-19.18 31.794-38.36 43.691-57.541-.862-13.928-1.333-28.466-5.312-37.141"
        stroke="#000"
      />
      <g clipPath="url(#prefix__n)">
        <g clipPath="url(#prefix__o)">
          <path
            fill="url(#prefix__p)"
            d="M41.332 24.633v6.402h27.656v-6.402zm0 0"
          />
        </g>
      </g>
      <g clipPath="url(#prefix__q)">
        <path
          fill="#313131"
          d="M7.98 33.547c-.593-.254-1.394-.086-2.195.082l-1.789 3c-1.11-.078-1.754.305-2.441.648l6.507-.324zm0 0"
          fillRule="evenodd"
        />
      </g>
      <path
        transform="matrix(.19929 0 0 .19857 1.518 .397)"
        fillRule="evenodd"
        d="M439.676 121.01l17.954-11.016 2.862 4.505-12.25 7.75-8.566-1.22zm0 0"
        stroke="#000"
      />
      <path
        transform="matrix(.19929 0 0 .19857 1.518 .397)"
        fill="#1A1A1A"
        fillRule="evenodd"
        d="M458.257 109.856l-9.624 1.908-12.23 7.377 4.253 2.48"
        stroke="#000"
      />
      <g clipPath="url(#prefix__r)">
        <g clipPath="url(#prefix__s)">
          <path
            fill="url(#prefix__t)"
            d="M64.414 32.371h14.234v12.723H64.414zm0 0"
            fillRule="evenodd"
          />
        </g>
      </g>
      <path
        transform="matrix(.19929 0 0 .19857 1.518 .397)"
        fill="none"
        d="M387.028 161.85c-12.584 14.93-22.463 30.767-25.305 48.964-.804 5.174-2.842 10.19-12.25 14.301l-33.871-1.632c1.607-2.44 2.744-4.387 3.273-5.725l30.597-.413c6.155-18.767 15.661-37.554 26.128-56.322zm0 0"
        stroke="#000"
      />
      <path
        transform="matrix(.19929 0 0 .19857 1.518 .397)"
        fill="none"
        d="M498.459 145.109c-42.69-13.948-88.38-20.4-133.051-29.39"
        stroke="#5C5C5C"
      />
      <path
        transform="matrix(.19929 0 0 .19857 1.518 .397)"
        fillRule="evenodd"
        d="M201.309 155.023l19.993-2.459c1.588-4.21-.49-8.42-2.039-12.649l-18.366 6.944c-1.783 3.109-3.136 6.119.412 8.164zm0 0"
        stroke="#000"
      />
      <path
        fill="#5C5C5C"
        d="M98.414 28.48c1.504 2.223.871 4.801 1.219 7.215l3.254-.406-1.871-6.16zm0 0"
        fillRule="evenodd"
      />
      <g clipPath="url(#prefix__u)">
        <path
          d="M103.05 35.613l-4.148.082c.63 1.106.38 2.215.164 3.32l3.903-.648c.46-1.133.492-2.05.082-2.754zm0 0"
          fillRule="evenodd"
        />
      </g>
      <g clipPath="url(#prefix__v)">
        <path
          transform="matrix(.19929 0 0 .19857 1.518 .397)"
          fill="none"
          d="M509.475 177.351l-20.817.414c3.156 5.567 1.902 11.154.824 16.72l19.581-3.265c2.313-5.705 2.47-10.328.412-13.869zm0 0"
          stroke="#000"
        />
      </g>
      <path
        fill="#B2B2B2"
        d="M97.723 33.734c-.387-.144-1.496-1.754-1.614-2.347a7.776 7.776 0 00-.093-.414c-.043-.149-.356-.266-.356-.133 0 .05-.043.047-.113-.012-.078-.062-.176-.066-.324-.012-.118.043-.27.059-.336.036-.067-.028-.121-.008-.121.043 0 .046-.043.078-.094.066-.05-.008-.098.062-.11.164-.007.102.008.184.036.184.078 0 .41.71.406.87 0 .122-.016.118-.094-.023a5.826 5.826 0 00-.355-.484c-.145-.18-.266-.36-.27-.406-.004-.043-.183-.172-.402-.282a59.916 59.916 0 01-.754-.398 6.18 6.18 0 00-.926-.379c-.316-.102-.516-.203-.45-.227.067-.02.599-.058 1.18-.085.583-.024 1.188-.063 1.344-.09l.282-.043-.274.125c-.27.12-.273.129-.129.289.164.18.828.402 1.211.402.504.004.613.082.899.645.152.3.375.609.496.687.43.281 1.07.117 1.273-.324.05-.11.121-.2.16-.2.035 0 .196.204.356.45.457.715.68.555.695-.504.012-.605.012-.617.078-.242.184 1.11-.023 2.101-.469 2.215-.101.023-.187.086-.187.133 0 .046-.023.062-.05.03-.032-.027-.095.005-.145.071-.121.16-.54.273-.75.195zm0 0M77.477 29.414c-.348-.098-1.133-.527-1.075-.586.02-.02.215.035.434.121s.746.238 1.172.336c.426.098.789.192.805.207.078.074-1.036.008-1.336-.078zm0 0"
      />
      <path
        fill="#B2B2B2"
        d="M78.297 29.535c-.024-.039-.219-.09-.43-.11-.453-.046-1.457-.472-1.035-.437.137.012.293.047.344.078.054.036.097.04.097.008 0-.031.055-.012.122.043.066.055.18.078.246.055.066-.027.12-.016.12.02 0 .085 1.044.351 1.141.292.04-.023.094-.007.121.04.032.05-.09.081-.316.081-.2 0-.383-.03-.41-.07zm0 0"
      />
      <path
        transform="matrix(.19929 0 0 .19857 1.518 .397)"
        fill="none"
        d="M192.743 183.883l138.363-1.22"
        stroke="#000"
        strokeWidth={2}
      />
      <path
        transform="matrix(.19929 0 0 .19857 1.518 .397)"
        fillRule="evenodd"
        d="M61.3 183.194c15.034-10.682 30.087-8.44 45.12-12.61 26.247 1.023 32.48 17.43 44.044 29.764 4.508 15.226 15.21 18.826 25.246 23.705l49.963.512-.549-8.086-46.729.512c-14.837-6.787-25.07-19.633-32.772-35.823-11.29-9.226-23.13-17.213-38.673-17.154-11.996 1.121-23.991 2.321-35.987 6.059-8.33.354-13.956 8.4-20.934 12.61zm0 0"
        stroke="#000"
        strokeWidth={1.275}
      />
      <path
        fill="#8F8F8F"
        d="M73.813 42.512h.398c1.574-2.88 1.594-6.328 6.242-8.075 2.707-.07 4.906-1.085 9.102 1.653 1.351 1.965 2.058 3.93 2.527 5.89l1.727-.726c-.332-2.203-.504-4.25-.996-6.617-.876-1.332-2.555-1.75-4.454-1.723l-9.566-.133c-2.7 1.672-4.52 7.114-4.98 9.73zm0 0"
        fillRule="evenodd"
      />
      <path
        transform="matrix(.19929 0 0 .19857 1.518 .397)"
        fill="none"
        d="M363.115 212.407c10.721-23.901 21.776-45.285 48.531-42.433 33.498 3.01 39.516 20.97 41.75 40.053"
        stroke="#8F8F8F"
        strokeWidth={3.055}
      />
      <path
        transform="matrix(.19929 0 0 .19857 1.518 .397)"
        fillRule="evenodd"
        d="M386.087 163.423l-10.33-1.318-13.662 23.666 7.664 1.318c3.568-9.285 9.213-17.036 16.328-23.666zm0 0"
        stroke="#000"
      />
      <path
        fill="gray"
        d="M65.04 40.082c1.089-1.137 2.218-2.3 2.51-2.594l.532-.531 2.281.05c1.258.028 2.364.071 2.453.095l.164.039-.183.172c-.211.199-.223.261-.074.382.152.13.129.39-.102 1.305-.398 1.547-.844 2.848-1.016 2.941-.199.11-2.543.188-5.98.196l-2.57.008zm0 0"
      />
      <path
        fill="#CCC"
        d="M68.512 43.46c-.383.536-.192 1.106.133 1.688.265.075.535.145.8.051-.265-.582-.492-1.16-.175-1.703-.196-.039-.34-.105-.758-.035zm0 0"
        fillRule="evenodd"
      />
      <path
        fill="#8F8F8F"
        d="M91.68 42.313l.066 1.058 3.656-1.125.332.664 5.313-.996 1.86-3.375-4.052.664c.618-1.465.438-2.664 0-3.773h.665c-.125-2.2.78-4.254-.997-6.95-7.46-2.062-15.574-3.605-23.914-4.964.395 3.933 1.485 6.062 2.922 6.023 8.48-.004 10.047-.289 14.48.461 3.684 2.04 3.739 3.512 3.989 5.629l.664 5.492-2.66.66-.266-.46c-.793.222-1.91.124-2.058.992zm0 0"
        fillRule="evenodd"
      />
      <path
        transform="matrix(.19929 0 0 .19857 1.518 .397)"
        fillRule="evenodd"
        d="M369.975 125.102c-5.998-4.25-7.644 6.748 4.488 17.567 16.132 4.545 29.52 4.486 42.436 3.66l46.945.826c3.038-1.909 2.058-3.817.823-5.725-18.249-4.898-63.076-13.298-94.692-16.328zm0 0"
        stroke="#000"
        strokeWidth={1.5}
      />
      <path d="M77.477 20.602h2.41c.14 0 .21.07.21.21v.774c0 .14-.07.207-.21.207h-2.41c-.141 0-.211-.066-.211-.207v-.773c0-.141.07-.211.21-.211" />
      <path
        transform="matrix(.19929 0 0 .19857 1.518 .397)"
        fill="#1A1A1A"
        fillRule="evenodd"
        d="M487.835 112.374l-11.839-.433-25.677 15.62 7.742 4.348"
        stroke="#000"
        strokeWidth={1.031}
      />
      <path
        transform="matrix(.19929 0 0 .19857 1.518 .397)"
        fillRule="evenodd"
        d="M449.476 121.836l27.343-14.282 11.428-.826 9.8 24.492.412 13.062-30.205-8.557-.412-6.531zm0 0"
        stroke="#000"
      />
      <path
        fill="#054996"
        d="M82.164 27.355h.176c.148 0 .289.028.426.082a1.122 1.122 0 01.601.602c.055.137.082.277.082.422v3.148a1.08 1.08 0 01-.324.781 1.122 1.122 0 01-.36.243 1.131 1.131 0 01-.425.082h-.176c-.148 0-.289-.028-.426-.082a1.122 1.122 0 01-.601-.602 1.112 1.112 0 01-.082-.422v-3.148a1.08 1.08 0 01.324-.781c.105-.106.223-.184.36-.242.136-.055.277-.083.425-.083"
      />
      <path
        transform="matrix(.19929 0 0 .19857 1.518 .397)"
        fill="#FFF"
        fillRule="evenodd"
        d="M426.092 126.755c15.76-2.932 32.89-9.463 41.005 8.006l3.999 1.003"
        stroke="#BABABA"
        strokeWidth={6}
      />
      <path
        fill="#BABABA"
        d="M67.5 33.61a.861.861 0 01-.262.632.877.877 0 01-.633.262c-.25 0-.46-.09-.636-.262a.861.861 0 01-.262-.633c0-.246.086-.457.262-.632a.879.879 0 01.636-.262c.247 0 .457.09.633.262a.861.861 0 01.262.632zm0 0"
      />
      <path
        fill="#CCC"
        d="M74.79 35.11c.62.519 1.417.41 2.257.163.156-.285.308-.566.242-.875-.828.188-1.644.332-2.293-.12-.094.21-.21.359-.207.831zm0 0"
        fillRule="evenodd"
      />
      <path
        d="M2.332 41.055c3.176.101 3.297 1.504 2.79 3.18l8.171.593 1.594-1.39-7.371-1.586.398-.797zm0 0"
        fillRule="evenodd"
      />
      <g clipPath="url(#prefix__w)">
        <path
          transform="matrix(.19929 0 0 .19857 1.518 .397)"
          fill="none"
          d="M4.085 204.755c15.935.511 16.543 7.574 13.995 16.013l41.005 2.99 7.997-7.003-36.987-7.987 2-4.013zm0 0"
          stroke="#000"
        />
      </g>
      <path
        fill="#CCC"
        d="M35.523 42.625c-.597.277-.714.871-.718 1.531.195.196.394.39.668.438.058-.637.148-1.25.691-1.567-.148-.132-.242-.257-.64-.402zm0 0M33.297 40.668c-.66.117-.953.695-1.164 1.379.129.258.258.516.508.644.254-.644.527-1.254 1.148-1.425-.105-.18-.156-.336-.492-.598zm0 0"
        fillRule="evenodd"
      />
      <path
        fill="#B3B3B3"
        d="M30.36 36.535c-.598.3-.712.938-.72 1.653.196.21.395.421.672.472.055-.687.145-1.351.688-1.691-.148-.14-.242-.278-.64-.434zm0 0M22.43 32.648c-.383.547-.176 1.16.16 1.793.273.094.547.184.816.098-.281-.633-.52-1.258-.207-1.816-.199-.051-.347-.13-.77-.075zm0 0M12.875 35.105c-.129.653.305 1.137.867 1.579.29-.024.578-.051.785-.235-.507-.469-.976-.945-.914-1.586-.203.035-.37.024-.738.242zm0 0"
        fillRule="evenodd"
      />
      <path
        fill="#CCC"
        d="M68.512 43.46c-.383.536-.192 1.106.133 1.688.265.075.535.145.8.051-.265-.582-.492-1.16-.175-1.703-.196-.039-.34-.105-.758-.035zm0 0M72 41.066c.523.52 1.195.41 1.898.164.133-.285.262-.566.204-.875-.696.188-1.383.333-1.93-.12-.078.21-.176.359-.172.831zm0 0"
        fillRule="evenodd"
      />
      <path d="M29.438 42.445c0 3.95-3.215 7.149-7.176 7.149-3.961 0-7.176-3.2-7.176-7.149s3.215-7.148 7.176-7.148c3.96 0 7.175 3.2 7.175 7.148zm0 0" />
      <g mask="url(#prefix__y)" clipPath="url(#prefix__x)">
        <g clipPath="url(#prefix__z)" transform="translate(12 32)">
          <g mask="url(#prefix__A)">
            <image
              width={82}
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xlinkHref="data:image/png;base64,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"
              xlinkType="simple"
              xlinkActuate="onLoad"
              height={81}
              xlinkShow="embed"
              transform="translate(.56 .808) scale(.23774)"
            />
          </g>
        </g>
      </g>
      <path
        fill="#4D4D4D"
        d="M27.297 42.512c0 2.687-2.188 4.867-4.883 4.867-2.7 0-4.883-2.18-4.883-4.867 0-2.688 2.184-4.864 4.883-4.864 2.695 0 4.883 2.176 4.883 4.864zm0 0"
      />
      <g mask="url(#prefix__B)">
        <g clipPath="url(#prefix__C)" transform="translate(16 36)">
          <g mask="url(#prefix__D)">
            <image
              width={50}
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xlinkHref="data:image/png;base64,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"
              xlinkType="simple"
              xlinkActuate="onLoad"
              height={50}
              xlinkShow="embed"
              transform="translate(.601 .611) scale(.23774)"
            />
          </g>
        </g>
      </g>
      <path
        transform="matrix(.04171 0 0 .04156 8.789 23.67)"
        fill="none"
        d="M288.165 391.629l-4.683-36.563 23.413 28.103 2.81-35.622 16.856 33.743 2.81-34.683 18.73 37.502 9.365-31.862 3.746 33.742 26.222-19.644-10.302 30.83 31.841-13.066-17.793 29.983 32.777-8.459-23.412 28.103 33.713 5.64-30.904 10.245 31.841 12.218-36.523 7.52 33.713 13.064-41.205 8.46 36.523 10.244-44.952 3.76 29.032 17.764-44.016-5.545 24.349 25.283-39.333-16.918 12.175 31.863-27.159-27.163-4.682 33.742-19.667-35.622-5.619 34.682-8.428-39.382-17.794 31.863 2.81-38.348-23.413 24.343 8.429-37.502-29.968 14.099 15.92-32.803-32.777 5.64L251.64 460.9l-32.777 1.88 32.777-18.705-29.968-7.519 32.778-5.64-28.095-19.643 36.523 4.7-24.349-24.344 35.587 12.124-16.857-29.983zm0 0"
        stroke="#000"
        strokeWidth={5}
      />
      <path
        fill="#666"
        d="M25.516 42.578a3.075 3.075 0 01-3.082 3.067 3.074 3.074 0 01-3.079-3.067 3.075 3.075 0 013.079-3.07 3.076 3.076 0 013.082 3.07zm0 0"
      />
      <path d="M23.559 42.516a1.065 1.065 0 11-2.131.002 1.065 1.065 0 012.13-.002zm0 0M20.941 41.191a.13.13 0 01-.128.133.13.13 0 010-.261.13.13 0 01.128.128zm0 0M24.457 43.84a.13.13 0 01-.129.129.13.13 0 01-.129-.13.13.13 0 01.13-.128.13.13 0 01.128.129zm0 0M20.941 43.996a.13.13 0 01-.128.129.13.13 0 01-.13-.129c0-.074.06-.129.13-.129s.128.055.128.13zm0 0M24.3 41.191a.13.13 0 01-.128.133.13.13 0 010-.261.13.13 0 01.129.128zm0 0M91.016 41.75c0 4.113-3.344 7.445-7.473 7.445s-7.473-3.332-7.473-7.445 3.344-7.445 7.473-7.445 7.473 3.332 7.473 7.445zm0 0" />
      <g mask="url(#prefix__E)">
        <g clipPath="url(#prefix__F)" transform="translate(73 31)">
          <g mask="url(#prefix__H)" clipPath="url(#prefix__G)">
            <image
              width={85}
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xlinkHref="data:image/png;base64,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"
              xlinkType="simple"
              xlinkActuate="onLoad"
              height={84}
              xlinkShow="embed"
              transform="translate(.42 .857) scale(.23774)"
            />
          </g>
        </g>
      </g>
      <path
        fill="#4D4D4D"
        d="M88.785 41.82c0 2.797-2.277 5.067-5.086 5.067-2.808 0-5.086-2.27-5.086-5.067 0-2.8 2.278-5.066 5.086-5.066 2.809 0 5.086 2.266 5.086 5.066zm0 0"
      />
      <g mask="url(#prefix__I)">
        <g clipPath="url(#prefix__J)" transform="translate(77 35)">
          <g mask="url(#prefix__L)" clipPath="url(#prefix__K)">
            <image
              width={52}
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xlinkHref="data:image/png;base64,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"
              xlinkType="simple"
              xlinkActuate="onLoad"
              height={52}
              xlinkShow="embed"
              transform="translate(.462 .66) scale(.23774)"
            />
          </g>
        </g>
      </g>
      <path
        transform="matrix(.04345 0 0 .0433 69.51 22.192)"
        fill="none"
        d="M288.194 391.593l-4.675-36.544 23.375 28.152 2.787-35.641 16.902 33.746 2.787-34.648 18.7 37.446 9.44-31.852 3.686 33.746 26.252-19.67-10.339 30.86 31.826-13.084-17.8 29.956 32.814-8.391-23.375 28.062 33.714 5.594-30.927 10.286 31.826 12.182-36.5 7.489 33.713 13.174-41.266 8.391 36.591 10.286-44.952 3.79 29.04 17.776-44.054-5.595 24.364 25.265-39.378-16.873 12.227 31.851-27.15-27.16-4.676 33.747-19.689-35.641-5.664 34.649-8.36-39.341-17.802 31.852 2.787-38.349-23.375 24.272 8.361-37.445-29.938 14.076 15.913-32.754-32.725 5.594 29.039-29.957-32.815 1.895 32.815-18.768-30.028-7.49 32.815-5.593-28.14-19.67 36.591 4.691-24.364-24.362 35.602 12.181-16.902-29.957zm0 0"
        stroke="#000"
        strokeWidth={5}
      />
      <path
        fill="#666"
        d="M86.93 41.887a3.2 3.2 0 01-3.207 3.195 3.202 3.202 0 01-3.207-3.195 3.202 3.202 0 013.207-3.196 3.2 3.2 0 013.207 3.196zm0 0"
      />
      <path d="M84.895 41.824a1.112 1.112 0 01-2.223 0 1.112 1.112 0 012.223 0zm0 0M82.172 40.445a.138.138 0 01-.137.137.138.138 0 01-.137-.137c0-.074.063-.133.137-.133.074 0 .137.06.137.133zm0 0M85.832 43.203a.138.138 0 01-.137.137.135.135 0 01-.132-.137c0-.074.058-.137.132-.137.075 0 .137.063.137.137zm0 0M82.172 43.363a.136.136 0 01-.137.137.136.136 0 01-.137-.137c0-.074.063-.133.137-.133.074 0 .137.06.137.133zm0 0M85.668 40.445a.135.135 0 01-.133.137.138.138 0 01-.137-.137c0-.074.063-.133.137-.133.074 0 .133.06.133.133zm0 0" />
      <path
        fill="#CCC"
        d="M42.988 44.035h17.34c.219 0 .406.078.563.23a.767.767 0 01.234.563v.793c0 .223-.078.41-.234.563a.767.767 0 01-.563.234h-17.34a.767.767 0 01-.562-.234.755.755 0 01-.235-.563v-.793c0-.219.079-.406.235-.562a.779.779 0 01.562-.23"
      />
      <path
        fill="#BABABA"
        d="M67.621 18.813l5.645-.063c.57.39.734 1.02.125 2.082-1.547.29-3.07.598-5.77.063 0 0-1.625-.63-1.586-1.2.04-.566 1.586-.883 1.586-.883zm0 0"
        fillRule="evenodd"
      />
      <path
        fill="#054996"
        d="M78.578 27.355h.172a1.117 1.117 0 01.79.325c.1.101.183.222.237.36.059.136.086.276.086.42v3.15c0 .144-.027.288-.086.421a1.07 1.07 0 01-.238.36 1.117 1.117 0 01-.79.324h-.17a1.08 1.08 0 01-.785-.324 1.025 1.025 0 01-.243-.36 1.045 1.045 0 01-.086-.422v-3.148c0-.145.027-.285.086-.422.054-.137.136-.258.242-.36a1.08 1.08 0 01.785-.324M85.352 27.355h.175a1.08 1.08 0 01.785.324c.106.102.188.223.243.36.054.137.086.277.086.422v3.148a1.115 1.115 0 01-1.114 1.106h-.175c-.145 0-.29-.028-.426-.082a1.166 1.166 0 01-.36-.242 1.08 1.08 0 01-.324-.782v-3.148a1.08 1.08 0 01.324-.781c.106-.106.227-.184.36-.242.136-.055.281-.083.426-.083"
      />
      <path
        transform="matrix(.19929 0 0 .19857 1.518 .397)"
        fill="gray"
        fillRule="evenodd"
        d="M351.51 116.997c3.784 26.479 12.467 47.646 43.613 44.479 22.894 3.403 61.782-4.702 64.37 13.397l5.174 33.246 12.094-3.895-4.744-33.246c-4.704-24.492-27.363-22.014-47.512-23.332h-38.438c-10.545.374-15.19-6.885-17.719-16.839l-3.019-16.407zm0 0"
        stroke="#5C5C5C"
        strokeWidth={1.5}
      />
      <path d="M72.074 18.793l.059 2.402c.004.137-.063.207-.203.211l-.778.02c-.136.004-.21-.063-.215-.203l-.058-2.403c-.004-.136.062-.207.203-.21l.777-.02c.141-.004.211.062.215.203" />
      <path
        transform="matrix(.19929 0 0 .19857 1.518 .397)"
        fill="none"
        d="M431.208 178.158l27.755-1.003"
        stroke="#000"
        strokeWidth={2.236}
      />
      <path
        transform="matrix(.19929 0 0 .19857 1.518 .397)"
        fill="none"
        d="M473.037 177.883l16.092-.453"
        stroke="#000"
        strokeWidth={1.937}
      />
      <path
        fill="#CCC"
        d="M88.84 32.129c-.383.3-.192.621.129.95.27.038.539.081.804.026-.27-.324-.492-.652-.175-.957-.196-.023-.34-.058-.758-.02zm0 0M81.266 32.129c-.383.3-.188.621.132.95.27.038.536.081.801.026-.265-.324-.492-.652-.176-.957-.195-.023-.34-.058-.757-.02zm0 0M73.344 28.285c-.453-.183-.637.145-.758.586.098.25.195.504.375.703.152-.39.32-.75.746-.629-.078-.18-.121-.32-.363-.66zm0 0M74.73 27.879c.36.328.645.082.915-.29-.004-.269-.012-.538-.11-.788-.277.316-.562.594-.918.336.012.195 0 .34.113.742zm0 0M88.84 29.352c-.383.296-.192.62.129.945.27.043.539.082.804.031-.27-.328-.492-.652-.175-.96-.196-.02-.34-.055-.758-.016zm0 0"
        fillRule="evenodd"
      />
      <path
        d="M91.613 41.531l7.774-1.191v-1.192l3.586-.593-2.391 3.773-8.77 1.387zm0 0"
        fillRule="evenodd"
      />
      <g clipPath="url(#prefix__M)">
        <path
          transform="matrix(.19929 0 0 .19857 1.518 .397)"
          fill="none"
          d="M452.083 207.155l39.006-6v-6l17.994-2.99-11.996 19.003-44.004 6.984zm0 0"
          stroke="#000"
        />
      </g>
      <path
        transform="matrix(.19929 0 0 .19857 1.518 .397)"
        fill="none"
        d="M327.343 171.45c-1.059-6.06.568-6.57.568-6.57"
        stroke="#000"
        strokeWidth={0.466}
      />
      <path
        fill="#CCC"
        d="M93.96 37.898c-.355-.37-.675-.136-.983.23-.016.286-.032.571.05.84.317-.312.637-.581.993-.28 0-.204.023-.36-.06-.79zm0 0M96.75 37.898c-.355-.37-.672-.136-.984.23-.016.286-.032.571.05.84.317-.312.637-.581.993-.28.004-.204.027-.36-.059-.79zm0 0"
        fillRule="evenodd"
      />
      <path
        fill="#BABABA"
        d="M74.078 23.184c-.937-.817-.625-2.133-3.988-1.985-2.77-.07-2.79 1.508-2.988 2.977l4.585-.395zm0 0"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default DeLorean;
