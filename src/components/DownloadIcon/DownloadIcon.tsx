import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import download_json from '../../assets/lottie/download.json'
import React, { useEffect, useRef } from 'react'
import styles from './DownloadIcon.module.scss'
import { DownloadIconProps } from './DownloadIcon.interface'

function DownloadIcon({ play, width, optionable }: DownloadIconProps) {
    const lottieRef = useRef<LottieRefCurrentProps>(null)

    useEffect(() => {
        if (lottieRef.current) {
            lottieRef.current.setSpeed(1.5)
            if (play) {
                lottieRef.current.play()
            } else {
                lottieRef.current.stop()
            }
        }
    }, [play])

    return (
        <div className={styles.downloadCsvTour}>
            <Lottie
                lottieRef={lottieRef}
                initialSegment={[15, 90]}
                animationData={download_json}
                loop={true}
                style={{
                    width: width ? width : 35,
                    height: width ? width : 35,
                    marginTop: !optionable ? '-6px' : '',
                    overflow: 'none',
                }}
                autoplay={false}
            />
        </div>
    )
}

export default DownloadIcon
