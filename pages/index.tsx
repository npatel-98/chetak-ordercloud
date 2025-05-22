import { FunctionComponent } from 'react'
// import { useOcSelector } from '../ordercloud/redux/ocStore'
import styles from '../styles/Home.module.css'
import ImageHelper from '../helper/Image'

const Home: FunctionComponent = () => {
  // const user = useOcSelector((s) => s.ocUser.user)

  return (
    <>
      <main className={styles.main}>
        <div className="banner h-screen w-full relative flex  justify-center">
          <ImageHelper url="	https://cdn.bajajauto.com/-/media/assets/bajajauto/bikes/pulsar-k-2024/hero-banner/web-banner.webp" pictureClasses='w-full' />
        </div>

        {/* {user && user !== undefined && (
          <pre className={styles.code}>
            <code>{JSON.stringify(user, null, 2)}</code>
          </pre>
        )} */}
      </main>
      {/* </div> */}
    </>
  )
}

export default Home
