
import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IconregistryService } from './iconregistry.service';
import { IconFontSet } from '@commons/icon';
import { LoggerService } from '@commons/logger';
import { HttpClientModule, HttpClient } from '@angular/common/http';

fdescribe('IconregistryService', () => {
  let _service: IconregistryService;
  let httpTestingController: HttpTestingController;
  let mockLoggerService;
  let httpClientSpy;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('httpClient', ['get']);
    mockLoggerService = jasmine.createSpyObj([
      'info',
      'debug',
      'warning',
      'error',
      'fatal'
    ]);
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [IconregistryService,
        { provide: LoggerService, useValue: mockLoggerService }
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    _service = TestBed.get(IconregistryService);
  });

  it('should be created', inject([IconregistryService], (service: IconregistryService) => {
    expect(service).toBeTruthy();
  }));

  describe('When addSvgIcon() invoke', () => {

    it('should be add the svg icon', () => {
      //Arrange     
      const iconName = 'moon';
      const url = 'assets/instagram.svg';
      //Act
      _service.addSvgIcon(iconName, url);
      const svgIcon = _service['svgIconConfigs'];
      // Arrange
      expect(svgIcon.get(iconName)).toEqual(url);
    });

    it('should be add the svg icon', () => {
      //Arrange
      const iconName = 'moon';
      const url = 'assets/symbol-defs.svg';
      //Act
      _service.addSvgIcon(iconName, url);
      _service.addSvgIcon(iconName, url);
      const svgIcon = _service['svgIconConfigs'];
      // Arrange
      expect(mockLoggerService.error).toHaveBeenCalled();
    });
  });

  
  describe('When registerFontAlias() invoke', () => {

    it('should be add the fontAwesome alias with correct fontSet', () => {
      //Arrange
      let config, alias, iconName;
      config = { fontSet: IconFontSet.FontAwesome, iconName: 'my-icon' },
        alias = 'my-icon', iconName = 'fa fa-home'
      //Act
      _service.registerFontAlias(config, alias, iconName);
      const aliasName = _service['_fontCssClassesByAlias'];
      // Assert
      expect(aliasName.get(config.iconName)).toEqual(iconName);
    });

    it('should not have added with correct the fontAwesome alias', () => {
      //Arrange
      let config, alias, iconName;
      config = { fontSet: IconFontSet.FontAwesome, iconName: 'my-icon1' },
        alias = 'my-icon1', iconName = 'alarm'
      //Act
      _service.registerFontAlias(config, alias, iconName);
      const aliasName = _service['_fontCssClassesByAlias'];
      // Assert
      expect(aliasName.get(config.iconName)).not.toEqual(iconName);
    });

    it('should be added with different fontAwesome alias', () => {
      //Arrange
      let firstConfig, secondConfig, alias, iconName;
      firstConfig = { fontSet: IconFontSet.FontAwesome, iconName: 'my-icon' },
        secondConfig = { fontSet: IconFontSet.FontAwesome, iconName: 'my-icon' },
        alias = 'my-icon', iconName = 'fa fa-glass'
      //Act
      _service.registerFontAlias(firstConfig, alias, iconName);
      _service.registerFontAlias(secondConfig, alias, iconName);
      const aliasName = _service['_fontCssClassesByAlias'];
      // Assert
      expect(mockLoggerService.error).toHaveBeenCalled();
    });

    it('should be add the material alias with valid iconName', () => {
      //Arrange
      let config, alias, iconName;
      config = { fontSet: IconFontSet.Material, iconName: 'my-alarm' },
        alias = 'my-alarm', iconName = 'alarm'
      //Act
      _service.registerFontAlias(config, alias, iconName)
      // Assert
      const aliasName = _service['_fontCssClassesByAlias'];
      expect(aliasName.get(config.iconName)).toEqual(iconName);
    });

    it('should not be add the material alias with valid name', () => {
      //Arrange
      let config, alias, iconName;
      config = { fontSet: IconFontSet.Material, iconName: 'my-alarm' },
        alias = 'my-alarm', iconName = 'fa fa-home'
      //Act
      _service.registerFontAlias(config, alias, iconName)
      // Assert
      const aliasName = _service['_fontCssClassesByAlias'];
      expect(aliasName.get(config.iconName)).not.toEqual(iconName);
    });

    it('should be add the material alias with different name', () => {
      //Arrange
      let configFirst, configSecond, alias, iconName;
      configFirst = { fontSet: IconFontSet.Material, iconName: 'my-alarm' },
        configSecond = { fontSet: IconFontSet.Material, iconName: 'my-alarm' },
        alias = 'my-alarm', iconName = 'alarm'
      //Act
      _service.registerFontAlias(configFirst, alias, iconName)
      _service.registerFontAlias(configSecond, alias, iconName)
      // Assert
      const aliasName = _service['_fontCssClassesByAlias'];
      expect(mockLoggerService.error).toHaveBeenCalled();
    });

    it('should be add the svgIcon alias with valid iconName', () => {
      //Arrange
      let config, alias, iconName;
      config = { fontSet: 'symbol', iconName: 'instagram' },
        alias = 'instagram', iconName = 'surface1'
      //Act
      _service.registerFontAlias(config, alias, iconName)
      // Assert
      const aliasName = _service['_fontCssClassesByAlias'];
      expect(aliasName.get(config.iconName)).toEqual(iconName);
    });

    it('should be not add the svgIcon alias with valid iconName', () => {
      //Arrange
      let config, alias, iconName;
      config = { fontSet: 'symbol', iconName: 'instagram' },
        alias = 'instagram', iconName = 'fa fa-home'
      //Act
      _service.registerFontAlias(config, alias, iconName)
      // Assert
      const aliasName = _service['_fontCssClassesByAlias'];
      expect(aliasName.get(config.iconName)).not.toEqual(iconName);
    });

    it('should be not add the svgIcon alias with different Type iconName', () => {
      //Arrange
      let configFirst, configSecond, alias, iconName;
      configFirst = { fontSet: 'symbol', iconName: 'instagram' },
        configSecond = { fontSet: 'symbol', iconName: 'instagram' },
        alias = 'instagram', iconName = 'icon-home'
      //Act
      _service.registerFontAlias(configFirst, alias, iconName)
      _service.registerFontAlias(configSecond, alias, iconName)
      // Assert
      const aliasName = _service['_fontCssClassesByAlias'];
      expect(mockLoggerService.error).toHaveBeenCalled();
    });
  })

  describe('when getNamedSvgIcon() invoke ', function () {
    // xit('should be invoke when get http response and node is symbol', function () {
    //   let svgXml: string;
    //   svgXml = `
    //   <symbol id="icon-home" viewBox = "0 0 32 32" ><title>home < /title>
    //   < path d = "M32 18.451l-16-12.42-16 12.42v-5.064l16-12.42 16 12.42zM28 18v12h-8v-8h-8v8h-8v-12l12-9z" > </path> < /symbol> < symbol id = "icon-home2" viewBox = "0 0 32 32" ><title>home2 < /title> < path d = "M16 1l-16 16 3 3 3-3v13h8v-6h4v6h8v-13l3 3 3-3-16-16zM16 14c-1.105 0-2-0.895-2-2s0.895-2 2-2c1.105 0 2 0.895 2 2s-0.895 2-2 2z" > </path> 
    //   < /symbol> < symbol id = "icon-home3" viewBox = "0 0 32 32" ><title>home3 < /title> < path d = "M32 19l-6-6v-9h-4v5l-6-6-16 16v1h4v10h10v-6h4v6h10v-10h4z" > </path>< /symbol>`
    //   // Arrange
    //   const configuration = {
    //     fontSet: "symbol",
    //     iconName: "icon-home",
    //     fontSize: "40px",
    //     fontColor: "blue",
    //     width: '200px',
    //     height: '200px'
    //   }
    //   _service.svgIconConfigs.set(configuration.fontSet,safeUrl)
    //   _service.getNamedSvgIcon(configuration).then((svgElement) => {
    //     expect(svgElement).toBeTruthy();
    //   });
    //   req = httpTestingController.expectOne(safeUrl);
    //   httpTestingController.verify();
    // });

    it('should be invoke when get http response and node is symbol', function () {
      let svgXml: string;
      let req: any;
      let safeUrl: any;
      safeUrl = 'assets/instagram.svg'
      svgXml = `<svg >< defs >
      <symbol id="icon-home" viewBox = "0 0 32 32" ><title>home < /title>
      < path d = "M32 18.451l-16-12.42-16 12.42v-5.064l16-12.42 16 12.42zM28 18v12h-8v-8h-8v8h-8v-12l12-9z" > </path> < /symbol> < symbol id = "icon-home2" viewBox = "0 0 32 32" ><title>home2 < /title> < path d = "M16 1l-16 16 3 3 3-3v13h8v-6h4v6h8v-13l3 3 3-3-16-16zM16 14c-1.105 0-2-0.895-2-2s0.895-2 2-2c1.105 0 2 0.895 2 2s-0.895 2-2 2z" > </path> 
      < /symbol> < symbol id = "icon-home3" viewBox = "0 0 32 32" ><title>home3 < /title> < path d = "M32 19l-6-6v-9h-4v5l-6-6-16 16v1h4v10h10v-6h4v6h10v-10h4z" > </path>< /symbol></defs > </svg>`
      // Arrange
      const configuration = {
        fontSet: "symbol",
        iconName: "icon-home",
        fontSize: "40px",
        fontColor: "blue",
        width: '200px',
        height: '200px'
      }
      _service.svgIconConfigs.set(configuration.fontSet,safeUrl)
      _service.getNamedSvgIcon(configuration).then((svgElement) => {
        expect(svgElement).toBeTruthy();
      });
      req = httpTestingController.expectOne(safeUrl);
      httpTestingController.verify();
    });
    });

    // xit('should be invoke if svg node G', function () {
    //   let svgXml: string;
    //   // tslint:disable-next-line:no-unused-expression
    //   svgXml = `<?xml version="1.0" encoding="UTF-8"?>
    //   <svg  viewBox="0 0 48 48" version="1.1" width="480px" height="480px">
    //   <g id="surface1">
    //   <path style=" fill:#FFCC80;" d="M 6 18 L 6 37 C 6 39.761719 8.238281 42 11 42 L 37 42 C 39.761719 42 42 39.761719 42 37 L 42 18 Z "/>
    //   <path style=" fill:#795548;" d="M 42 18 L 42 11 C 42 8.238281 39.761719 6 37 6 L 11 6 C 8.238281 6 6 8.238281 6 11 L 6 18 Z "/>
    //   </g>
    //   </svg>`
    //   // tslint:disable-next-line:no-unused-expression
    //   // Arrange
    //   const configuration = {
    //     fontSet: "symbol",
    //     iconName: "icon-home",
    //     fontSize: "40px",
    //     fontColor: "blue",
    //     width: '200px',
    //     height: '200px'
    //   }
    //   //Act
    //   spyOn<any>(_service, 'extractSvgIconSet').and.callThrough();
    //   //Act
    //   _service.getNamedSvgIcon(configuration);
    //   httpClientSpy.get.and.returnValue(svgXml);
    //   expect(_service['extractSvgIconSet']).toHaveBeenCalled();
    // });

     // xit('should be invoke if svg node G', function () {
    //   let svgXml: string;
    //   // tslint:disable-next-line:no-unused-expression
    //   svgXml = `<?xml version="1.0" encoding="UTF-8"?>
    //   <svg  viewBox="0 0 48 48" version="1.1" width="480px" height="480px">
    //   <g id="surface1">
    //   <path style=" fill:#FFCC80;" d="M 6 18 L 6 37 C 6 39.761719 8.238281 42 11 42 L 37 42 C 39.761719 42 42 39.761719 42 37 L 42 18 Z "/>
    //   <path style=" fill:#795548;" d="M 42 18 L 42 11 C 42 8.238281 39.761719 6 37 6 L 11 6 C 8.238281 6 6 8.238281 6 11 L 6 18 Z "/>
    //   </g>
    //   </svg>`
    //   // tslint:disable-next-line:no-unused-expression
    //   // Arrange
    //   const configuration = {
    //     fontSet: "symbol",
    //     iconName: "icon-home",
    //     fontSize: "40px",
    //     fontColor: "blue",
    //     width: '200px',
    //     height: '200px'
    //   }
    //   //Act
    //   spyOn<any>(_service, 'extractSvgIconSet').and.callThrough();
    //   //Act
    //   _service.getNamedSvgIcon(configuration);
    //   httpClientSpy.get.and.returnValue(svgXml);
    //   expect(_service['extractSvgIconSet']).toHaveBeenCalled();
    // });
  });
