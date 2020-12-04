!macro preInit
  SetRegView 64
  WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$LocalAppData\Programs\${PRODUCT_FILENAME}"
  WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$LocalAppData\Programs\${PRODUCT_FILENAME}"

  !system "echo '$LocalAppData\Programs\${PRODUCT_FILENAME}' > ${BUILD_RESOURCES_DIR}/preInit"


  SetRegView 32
  WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$LocalAppData\Programs\${PRODUCT_FILENAME}"
  WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$LocalAppData\Programs\${PRODUCT_FILENAME}"


!macroend


!macro customInstall

!macroend