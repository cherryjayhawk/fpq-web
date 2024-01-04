import '@/components/styles/waves.module.css'

function Waves({ direction =  'up' } : { direction: string }) {
  return (
    <div className={`h-96 w-full -translate-y-96 md:-translate-y-16 -z-10 ${ direction === 'down' ? 'rotate-180' : ''}`}>
    <svg className='p-0 m-0' width="100%" height="100%" fill="none" version="1.1"
    preserveAspectRatio='none'
     xmlns="http://www.w3.org/2000/svg">
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00B4DB" />
        <stop offset="50%" stopColor="#0083B0" />
        <stop offset="100%" stopColor="#224488" />
      </linearGradient>
      <path 
        height="100%"
        fill="url(#grad1)" 
        d="
          M0 67
          C 273,183
            822,-40
            1920.00,106 
          
          V 359 
          H 0 
          V 67
          Z">
        <animate 
          repeatCount="indefinite" 
          fill="url(#grad1)" 
          attributeName="d" 
          dur="15s"
          attributeType="XML"
          values="
            M0 77 
            C 473,283
              822,-40
              1920,116 
            
            V 359 
            H 0 
            V 67 
            Z; 

            M0 77 
            C 473,-40
              1222,283
              1920,136 
            
            V 359 
            H 0 
            V 67 
            Z; 

            M0 77 
            C 973,260
              1722,-53
              1920,120 
            
            V 359 
            H 0 
            V 67 
            Z; 

            M0 77 
            C 473,283
              822,-40
              1920,116 
            
            V 359 
            H 0 
            V 67 
            Z
            ">
        </animate>
      </path>
    </svg>
  </div>
  )
}

export default Waves