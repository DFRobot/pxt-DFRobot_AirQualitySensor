// 在此处测试；当此软件包作为插件使用时，将不会编译此软件包。
custom.setAddr(MyAddr.ADDR)
basic.forever(function () {
    serial.writeValue("x", custom.particleNumber(MyEnum1.UM10))
    serial.writeValue("y", custom.gainParticleConcentration_ugm3(MyType.STANDARD, MyEnum.PM1_0))
    serial.writeValue("z", custom.gainParticleConcentration_ugm3(MyType.STANDARD, MyEnum.PM1_0))
    basic.pause(100)
})
