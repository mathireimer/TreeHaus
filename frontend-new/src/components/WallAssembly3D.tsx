import React from 'react';
import styles from './WallAssembly3D.module.css';

interface Material {
  conductividad: string;
  espesor: string;
}

interface WallAssembly3DProps {
  materiales: Material[];
}

const WallAssembly3D: React.FC<WallAssembly3DProps> = ({ materiales }) => {
  return (
    <div className={styles.container}>
      <div className={styles.assembly}>
        <div className={styles.layer} style={{ height: '100px' }}>
          <div className={styles.label}>Suelo</div>
          <div className={styles.material}>
            {materiales[0].conductividad && (
              <div className={styles.info}>
                <div>k: {materiales[0].conductividad} W/m·K</div>
                <div>e: {materiales[0].espesor} mm</div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.layer} style={{ height: '150px' }}>
          <div className={styles.label}>Paredes</div>
          <div className={styles.material}>
            {materiales[1].conductividad && (
              <div className={styles.info}>
                <div>k: {materiales[1].conductividad} W/m·K</div>
                <div>e: {materiales[1].espesor} mm</div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.layer} style={{ height: '100px' }}>
          <div className={styles.label}>Techo</div>
          <div className={styles.material}>
            {materiales[2].conductividad && (
              <div className={styles.info}>
                <div>k: {materiales[2].conductividad} W/m·K</div>
                <div>e: {materiales[2].espesor} mm</div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.layer} style={{ height: '50px' }}>
          <div className={styles.label}>Abertura</div>
          <div className={styles.material}>
            {materiales[3].conductividad && (
              <div className={styles.info}>
                <div>k: {materiales[3].conductividad} W/m·K</div>
                <div>e: {materiales[3].espesor} mm</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallAssembly3D; 