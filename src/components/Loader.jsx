import {Html, useProgress } from '@react-three/drei'
import {motion} from 'framer-motion'
import { slideIn } from '../utils/motion'


const Loader = () => {
  const {progress} = useProgress()
  return (
    <Html>
      <span className='canvas-load'>
      <motion.div
        // variants={slideIn('right', 'tween', 0.2, 1)}

        
        animate= {{
          // y: 0,
          x:[-200, 100, -200]
         
        }}
        transition={{duration:0.85, repeatType:'loop', repeat:Infinity, }}

            // animate={{
            //   x:[-200, 100, -200]
            // }}
            // transition={{duration:1.5, repeatType:'loop', repeat:Infinity, }}
          >
        <p className='-0 w-75 h-75 bg-[#915eff] rounded-2xl p-8'
        style={{
          fontSize:14,
          color:'#f1f1f1',
          fontWeight:800,
          marginTop:40,
          // transform: 'rotate(20%)',
          transition: '10s ease-in-out'
        }}
        >
          
          {progress.toFixed(2)}%
        </p>
        </motion.div>

      </span>
    </Html>
  )
}

export default Loader





