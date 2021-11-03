
/**
 * 使用此文件来定义自定义函数和图形块。
 * 想了解更详细的信息，请前往 https://makecode.microbit.org/blocks/custom
 */

enum MyEnum {
    //% block="PM1.0"
    PM1_0=0,
    //% block="PM2.5"
    PM2_5=1,
    //% block="PM10"
    PM10=2,
}
enum MyType{
    //% block="standard"
    STANDARD=0,
    //% block="atmosphere"
    ATMOSPHERE = 1,
}
enum MyEnum1 {
    //% block="0.3um"
    UM03=0X11,
    //% block="0.5um"
    UM05=0X13,
    //% block="1.0um"
    UM10=0X15,
    //% block="2.5um"
    UM25=0X17,
    //% block="5.0um"
    UM50=0X19,
    //% block="10um"
    UM100=0X1B
}
enum MyAddr{
    //% block="0X19"
    ADDR = 0x19,
}

/**
 * 自定义图形块
 */
//% weight=100 color=#0fbc11 icon="\uf0d3" block="Air Quality Sensor"
namespace custom {
    let I2CAddr = 0x19;
    let PARTICLENUM_GAIN_VERSION = 0x1D;
    /**
     * TODO:设置I2C地址
     * @param addr I2C地址 
     */
    //% block="set I2C addr %addr"
    //% weight=98
    export function setAddr(eAddr: MyAddr){
        I2CAddr = eAddr;
    }
    /**
     * TODO: 获取指定颗粒物大小
     * @param eOption 获取数据选项
     */
    //% block="read %type %eOption particulate matter concentration in the environment(ug/m3)"
    //% weight=96
    export function gainParticleConcentration_ugm3(eType:MyType, eOption: MyEnum): number {
        let data;
        let buffer;
        if (eType == MyType.STANDARD){
            switch (eOption) {
                case MyEnum.PM1_0:
                    buffer = readReg(0X05, 2);
                    data = (buffer[0] << 8) | buffer[1];
                    break;
                case MyEnum.PM2_5:
                    buffer = readReg(0X07, 2);
                    data = (buffer[0] << 8) | buffer[1];
                    break;   
                default:
                    buffer = readReg(0X09, 2);
                    data = (buffer[0] << 8) | buffer[1];
                    break;
            }
        }else {
                switch (eOption) {
                    case MyEnum.PM1_0:
                        buffer = readReg(0X0B, 2);
                        data = (buffer[0] << 8) | buffer[1];
                        break;
                    case MyEnum.PM2_5:
                        buffer = readReg(0X0D, 2);
                        data = (buffer[0] << 8) | buffer[1];
                        break;
                    default:
                        buffer = readReg(0X0F, 2);
                        data = (buffer[0] << 8) | buffer[1];
                }
        }
        
        return data;
    }
    
    /**
     * TODO: 获取在0.1升空气中的颗粒物的个数
     * @param eOption 获取数据选项
     */
    //% block="Read the number of particles with particle size of air as %eOption per 0.1L of air"
    //% weight=95
    export function particleNumber(eOption: MyEnum1): number {
        let data;
        let buffer;
        switch(eOption){
            case MyEnum1.UM03:
                buffer = readReg(MyEnum1.UM03,2);
                data = (buffer[0]<<8)|buffer[1];
            break;
            case MyEnum1.UM05:
                buffer = readReg(MyEnum1.UM05,2);
                data = (buffer[0]<<8)|buffer[1];
            break;
            case MyEnum1.UM10:
                buffer = readReg(MyEnum1.UM10,2);
                data = (buffer[0]<<8)|buffer[1];
            break;
            case MyEnum1.UM25:
                buffer = readReg(MyEnum1.UM25,2);
                data = (buffer[0]<<8)|buffer[1];
            break;
            case MyEnum1.UM50:
                buffer = readReg(MyEnum1.UM50,2);
                data = (buffer[0]<<8)|buffer[1];
            break;
            default:
                buffer = readReg(MyEnum1.UM100,2);
                data = (buffer[0]<<8)|buffer[1];
        }
        return data;
    }
     /**
     * TODO: 获取版本
     */
    //% block="read version"
    //% weight=93
    export function readVersion(): number {
        let buffer = readReg(PARTICLENUM_GAIN_VERSION,1);
        return buffer[0];
    }
    /**
     * TODO: 从指定传感器中获取指定长度数据
     * @param  reg 寄存器值
     * @param  len 获取数据长度
     * @return 返回获取数据的buffer
     */
    function readReg(reg:number, len:number):Buffer{
        pins.i2cWriteNumber(I2CAddr, reg, NumberFormat.Int8LE);
        return pins.i2cReadBuffer(I2CAddr, len);
    }

    /**
     * TODO:向指定传感器寄存器中写入数据
     * @param reg 寄存器值
     * @param buf 写入数据
     * @return 无返回
     */
    function writeReg(buf:Buffer):void{
        pins.i2cWriteBuffer(I2CAddr, buf);
    }
}