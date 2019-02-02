/**
 * @author Ashok yadav
 * @class IconregistryService
 * @description The icon registry service for add Svg Icon and use for set fontSet.
 */
import { Injectable, Optional, Inject, SecurityContext, Renderer2, ElementRef, Renderer, RendererFactory2 } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { SafeResourceUrl, DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import {
  IconConfiguration, ElementNode, AttributeConfig, Index,
  IconFontSet, ColorType, SvgIconAttribute, validateFontSet, IconFontStyle
} from './icon/icon.model';
import { DOCUMENT } from '@angular/common';
import { map, catchError, finalize, share } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { LoggerService } from '@commons/logger';
import { IconLog } from '../src/icon/icon.log';


@Injectable()
export class IconregistryService {
  /**
  * URLs and cached SVG elements for individual icons. Keys are of the format.
  */
  public svgIconConfigs = new Map<string, string | string[]>();

  /**
    * SvgIconConfig objects and cached SVG elements for icon sets.
    * Multiple icon sets can be registered under the same namespace.
    */
  private iconSetConfigs = new Map<string, string[]>();

  /** Map from font identifiers to their CSS class names. Used for icon fonts. */
  private _fontCssClassesByAlias = new Map<string, string>();

  private renderer: Renderer2;

  private configuration: IconConfiguration;

  constructor(
    @Optional() private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    private rendererFactory: RendererFactory2,
    private service: LoggerService<IconLog>
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
 * Registers an icon by URL in the default namespace.
 * @param iconName Name under which the icon should be registered.
 * @param url
 */
  public addSvgIcon(iconName: string, url: string) {
    return this.addSvgIconConfig(iconName, url);
  }

  /**
  * Registers an icon by URL in the default.
  * @param url
  */
  public addIconUrl(iconName: string, url: string) {
    return this.addIconConfig(iconName, url);
  }

  private addIconConfig(iconName, url) {
    return this.iconSetConfigs.set(iconName, url)
  }
  /**
  * Registers an icon config by name in the specified set.
  * @param iconName Name under which to register the config.
  * @param config Config to be registered.
  */
  private addSvgIconConfig(iconName: string, config: string) {
    const svgIcon = this.svgIconConfigs.get(iconName);
    if (!svgIcon) {
      return this.svgIconConfigs.set(iconName, config);
    } else {
      this.service.error(new IconLog('Please add the svgIcon one time duplication occur'));
    }
  }

  /**
    * Defines an alias for a CSS class name to be used for icon fonts. Creating an cmnIcon
    * component with the alias as the fontSet input will cause the class name to be applied
    * to the `<cmn-icon>` element.
    *
    * @param alias Alias for the font.
    * @param className Class name override to be used instead of the alias.
    */
  public registerFontAlias(config: IconConfiguration, alias: string, iconName: string = alias): this {
    // check the user pass the iconName fontAwesome and Material or svgIcon is correct or not.
    // Here Match the iconName with fontSet and it should be valid else throw the error.  
    if (config.fontSet === IconFontSet.FontAwesome) {
      return this.fontAwesomeAlias(alias, config, iconName);
    } else if (config.fontSet === IconFontSet.Material) {
      return this.materialAlias(alias, config, iconName);
    } else {
      return this.svgIconAlias(alias, config, iconName);
    }
  }

  /**
   * For FontAwesome check and validate and alias is registered or not.
   * If already have an alias it throw the error
   * to the `<cmn-icon>` element.
   *
   * @param alias Alias for the font.
   * @param iconName Class name override to be used instead of the alias.
   * @param config 
   */
  private fontAwesomeAlias(alias, config, iconName): this {
    const aliasValue = this.validateAlias(alias);
    if (aliasValue) {
      const validName = validateFontSet(config, iconName);
      validName ? this._fontCssClassesByAlias.set(alias, iconName) :
        this.service.error(new IconLog('please register fontAwesome Alias'));
      return this
    } else {
      this.service.error(new IconLog(
        `Add an alias ${config.fontSet} is dublication Please add within diffrent Name`));
    }
  }

  /**
   * For material check and validate and alias is registered or not.
   * If already have an alias it throw the error
   * to the `<cmn-icon>` element.
   * @param alias Alias for the font.
   * @param iconName Class name override to be used instead of the alias.
   * @param config 
   */
  private materialAlias(alias, config, iconName): this {
    const aliasValue = this.validateAlias(alias);
    if (aliasValue) {
      const validName = validateFontSet(config, iconName);
      validName ? this._fontCssClassesByAlias.set(alias, iconName) :
        this.service.error(new IconLog('Please register material Alias'));
      return this
    } else {
      this.service.error(new IconLog(`Add an alias ${config.fontSet} is dublication Please add within diffrent Name`));
    }
  }

  /**
   * @description For svgIcon check and validate and alias is registered or not.
   * If already have an alias it trow the error.
   * @param alias Alias of the font is retrieved if user set the iconName as alias.
   * @param iconName Class name override to be used instead of the alias.
   * @param config config is retrieved which pass by the user.
   */
  private svgIconAlias(alias, config, iconName): this {
    const aliasValue = this.validateAlias(alias);
    if (aliasValue) {
      const validName = validateFontSet(config, iconName);
      validName ? this._fontCssClassesByAlias.set(alias, iconName) :
        this.service.error(new IconLog('please register material Alias'));
      return this
    } else {
      this.service.error(new IconLog(
        `Add an alias ${config.fontSet} is dublication Please add within different Name`));
    }
  }

  /**
   * Returns the CSS class name associated with the alias by a previous call to
   * registerFontClassAlias. If no CSS class has been associated, returns the alias unmodified.
   */
  classNameForFontAlias(alias: string): string {
    return this._fontCssClassesByAlias.get(alias) || alias;
  }

  private validateAlias(alias): boolean {
    const aliasValue = this.classNameForFontAlias(alias);
    return aliasValue === alias ? true : false;
  }

  /**
   * @description Returns an Promise that produces the icon (as an `<svg>` all DOM element)
   * The icon must have been previously registered with addIcon or addIconSet;
   * if not, the Observable will throw an error.
   *
   * @param fontSet fontset of the icon to be retrieved.
   */
  public getSvgIcon(fontSet: string): Promise<SVGElement> {
    // Return (copy of) cached icon if possible.;
    const key = fontSet;
    const iconUrl = this.svgIconConfigs.get(key);
    if (!iconUrl) {
      this.service.error(new IconLog(
        'Unable to find icon fontSet please add correct font set'));
      return;
    }
    // sanitized url is trusted url or not. 
    const SafeUrl = this.sanitizer.sanitize(SecurityContext.URL, iconUrl);
    return new Promise((resolve, reject) => {
      // If async opp successful     
      this.getSvgElement(SafeUrl).subscribe((svgElement: string) => {
        const svgIcon: any = this.extractSvgIconElement(svgElement);
        resolve(svgIcon);
      }, (error) => {
        // If async opp fails
        reject(error);
      });
      // If async opp fails
    });
  }

  /**
   * @description Execute and get all svg element by passing the url from the config .
   * @description Execute the function and get all element of node name `symbol` and node name 'g'. 
   * After get the all element by the nodeName enclose by the another `<svg></svg>` tag. 
   * @param iconUrl iconUrl icon element  to be retrieved.
   */
  public getSvgIconFromUrl(iconUrl: SafeUrl): Promise<string> {
    const SafeUrl = this.sanitizer.sanitize(SecurityContext.URL, iconUrl);
    return new Promise((resolve, reject) => {
      // If async opp successful     
      this.getSvgElement(SafeUrl).subscribe((svgElement: string) => {
        const svgIcon: any = this.extractSvgIconElement(svgElement);
        resolve(svgIcon);
      }, (error) => {
        // If async opp fails
        reject(error);
      });
      // If async opp fails
    });
  }

  /**
   * @description Execute the function and get all element of node name `symbol` and node name 'g'. 
   * After get the all element by the nodeName enclose by the another `<svg></svg>` tag. 
   * @param fontSet fontset of the icon to be retrieved.
   */
  private extractSvgIconElement(svgElement: string) {
    let element = new Array<any>();
    const document = this.getDomParser(svgElement);
    const iconHtmlElement = document.getElementsByTagName(ElementNode.Symbol);
    for (let i = 0; i < iconHtmlElement.length; i++) {
      const iconName = iconHtmlElement[i].id;
      const nodeName = iconHtmlElement[i].nodeName;
      if (nodeName === ElementNode.Symbol) { element.push(this.nodeElementSymbol(iconHtmlElement, iconName)) }
      else { element.push(this.nodeElementG(iconHtmlElement, iconName)); }
    }
    return element;
  }


  /**
  * @description Returns an Promise that produces the icon (as an `<svg>` DOM element) with the given name
  * The icon must have been previously registered with addIcon or addIconSet;
  * if not, the Observable will throw an error.
  * @param config Configuration of the icon to be retrieved.
  */
  public getNamedSvgIcon(config: IconConfiguration): Promise<SVGElement> {
    // Return (copy of) cached icon if possible.
    this.configuration = config;
    const key = config.fontSet;
    const iconUrl = this.svgIconConfigs.get(key);
    const iconName = this.classNameForFontAlias(config.iconName)
    // sanitized url is trusted url or not. 
    const SafeUrl = this.sanitizer.sanitize(SecurityContext.URL, iconUrl);
    return new Promise((resolve, reject) => {
      // If async opp successful     
      this.getSvgElement(SafeUrl).subscribe((svgElement: string) => {
        const svgIcon = this.extractSvgIconSet(svgElement, config, iconName);
        resolve(svgIcon);
      }, (error) => {
        // If async opp fails
        reject(error);
      });
      // If async opp fails
    });
  }

  /** 
   * @description Returns an Observable of the xml element which is use for create Dom svg element.
   * @param safeUrl Safe trusted url which is passed by the user.
  */
  private getSvgElement(SafeUrl): Observable<string> {
    return this.httpClient.get(SafeUrl, { responseType: 'text' });
  }

  /**
   * @description Searches the cached element of the given SvgIconSet for a nested icon element whose "id"
   * tag matches the specified name. If found, copies the nested element to a new SVG element and
   * returns it. Returns null if no matching element is found.
   * @param svgElement SvgElement which is retrived 
   * @param config config which is retrived configuartion passed by the user.
   * @param iconName iconName which is retrieved base on this icon name get element.
   */
  private extractSvgIconSet(svgElement: string, config: IconConfiguration, iconName: string): SVGElement {
    // Create the Attribute for the element.
    const attributesConfig: AttributeConfig = this.getElementAttributes(svgElement, config);
    // filter the element and get element by id name .
    const svgIconSet: any = this.getElementById(svgElement, iconName);
    // Html string pass inside the DOMparser and get Element.
    const document = this.getDomParser(svgIconSet);
    // Searches svg# element and store inside variable 
    const iconSource = document.querySelector(ElementNode.Svg);

    if (!iconSource) {
      this.service.error(new IconLog('please register the svg file'));
      return
    }
    // Clone node of  the element. 
    const iconElement = iconSource.cloneNode(true) as Element;

    // if element has svg tag then set the attribute.
    if (document.querySelector(ElementNode.Svg)) {
      return this.setSvgAttributes(iconElement as SVGElement, attributesConfig);
    } else {
      this.service.error(new IconLog('<svg> tag not found'));
    }
  }

  /**
   * @description Execute getElement function() Creates a DOM element from the given SVG string.
   * Element which is get through id name, and searches svg# element and store inside variable 
   * Extract element from string after check nodeName of the Element '<symbol>','<g>'
   * if there is no get any tag throw the error tag not found, and also throw error if nodeName is not matches.
   * @param svgElement SvgElement which is retrived 
   * @param iconName iconName which is retrieved base on this icon name get element.
   */
  private getElementById(svgElement: string, iconName: string): SVGElement {
    // Html string pass inside the DOMparser and get Element.
    const document = this.getDomParser(svgElement);
    if (document.querySelector(ElementNode.Symbol)) {
      const iconSource = document.querySelectorAll(ElementNode.Symbol);
      return this.extractElementFromString(iconSource, iconName);
    } else if (document.querySelector(ElementNode.G)) {
      const iconSource = document.querySelectorAll(ElementNode.G)
      return this.extractElementFromString(iconSource, iconName);
    } else {
      this.service.error(new IconLog('tag not found'));
    }
  }

  /**
  * @description Creates a DOM element by extract Element from given xml config.
  * extract element of different element tag '<symbol>'.
  * And make new element with `<svg></svg>` tag.
  * @param config contain all HtmlCollection which used to extract element.
  * @param svgIconName svg icon name which is retrieved.
  */
  private extractElementFromString(config, svgIconName): SVGElement {
    // Here iconName variable assign name of the icon which is get from the element id.     
    let nestedSvgElement: any;
    switch (config[Index.Zero].nodeName) {
      case (ElementNode.Symbol):
        nestedSvgElement = this.nodeElementSymbol(config, svgIconName);
        break;
      case (ElementNode.G):
        nestedSvgElement = this.nodeElementG(config, svgIconName)
        break;
    }
    return nestedSvgElement;
  }

  /**
  * @description Creates a DOM element by extract symbol tag Element from given xml config.
  * extract element and the split symbol then get innerHtml.
  * And make new element with `<svg></svg>` tag.
  * @param config contain all HtmlCollection which used to extract element
  * @param svgIconName name of the icon which is function to be extract.
  */
  private nodeElementSymbol(config, svgIconName): string {
    let svgElement: string
    for (let i = Index.Zero; i < config.length; i++) {
      const iconName = config[i].id;
      const iconElement = config[i].outerHTML;
      if (svgIconName === iconName) {
        const firstElement = iconElement.split('<symbol')[Index.One];
        const secondElement = firstElement.split('</symbol>')[Index.Zero];
        svgElement = `<svg${secondElement}</svg>`
      }
    }
    return svgElement;
  }

  /**
  * Creates a DOM element by extract  G tag Element from given xml config.
  * extract element tag '<g>' and make new element with `<svg></svg>` tag..
  * @param config contain all HtmlCollection which used to extract element
  * @param svgIconName name of the icon which is function to be extract.
  */
  private nodeElementG(config, svgIconName): string {
    let svgElement: string
    for (let i = Index.Zero; i < config.length; i++) {
      const iconName = config[i].id;
      const iconElement = config[i].outerHTML;
      switch (iconName) {
        case (svgIconName):
          svgElement = `<svg>${iconElement}</svg>`;
          break;
      }
    }
    return svgElement;
  }
  /**
  * Creates a DOM element by extract Element Using DOMParser which convert html in  to the Element.
  */
  private getDomParser(svgIconSet: string) {
    // Parse the xmln element in to the DOM-Parser and get the ELEMENT. 
    // ParseFromString extract to the string xmln which is parse by text/html.
    const parser = new DOMParser();
    return parser.parseFromString(svgIconSet, "text/html");
  }

  /**
    * Sets the default attributes for an SVG element to be used as an icon.
    * Get attribute viewBox value if witch is get from the xml svg tag.
    */
  private setSvgAttributes(svgElement: SVGElement, attributesConfig: AttributeConfig): SVGElement {
    // svgElement.setAttribute(IconFontStyle.Fit, attributesConfig.fit);
    svgElement.setAttribute(IconFontStyle.Width, attributesConfig.width);
    svgElement.setAttribute(IconFontStyle.Height, attributesConfig.height);
    //  svgElement.setAttribute(IconFontStyle.PreserveAspectRatio, attributesConfig.preserveAspectRatio);
    // Disable IE11 default behavior to make svgElements focusable.   
    svgElement.setAttribute(IconFontStyle.Focusable, attributesConfig.focusable);
    if (attributesConfig.viewBox) {
      svgElement.setAttribute(IconFontStyle.ViewBox, attributesConfig.viewBox);
    }
    return svgElement;
  }

  /**
  * Sets the default attributes for an SVG element to be used as an icon.
  * Get attribute viewBox value if it is get from the xml svg tag.
  */
  private getElementAttributes(svgElement: string, config: IconConfiguration) {
    let elementNode: any;
    const attributesConfig: AttributeConfig = new AttributeConfig();
    attributesConfig.width = config.width;
    attributesConfig.height = config.height;
    // attributesConfig.Fit = config.fit;
    // attributesConfig.focusable = config.focusable;
    // attributesConfig.PreserveAspectRatio = config.preserveAspectRatio;

    // Html string pass inside the DOMparser and get Element.
    const document = this.getDomParser(svgElement);
    // Get the Atributes based on the  nodename.
    if (document.querySelector(ElementNode.G)) {
      elementNode = document.getElementsByTagName(ElementNode.Svg);
    } else if (document.querySelector(ElementNode.Symbol)) {
      elementNode = document.getElementsByTagName(ElementNode.Symbol);
    }
    // filter the index of the element and retrieve the name and value.
    const elementAttributes = elementNode[Index.Zero].attributes;
    for (let i = Index.Zero; i < elementAttributes.length; i++) {
      if (elementAttributes[i].name === IconFontStyle.ViewBox ||
        elementAttributes[i].name === IconFontStyle.Id) {
        attributesConfig.viewBox = elementAttributes[i].value;
      }
    }
    return attributesConfig;
  }
}
