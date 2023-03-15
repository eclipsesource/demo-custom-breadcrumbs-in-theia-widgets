import { injectable } from '@theia/core/shared/inversify';
import { Emitter, Event, MaybePromise, MenuModelRegistry, URI } from '@theia/core';
import { CustomBreadcrumbsWidget } from './custom-breadcrumbs-widget';
import { AbstractViewContribution, Breadcrumb, BreadcrumbsContribution } from '@theia/core/lib/browser';
import { Command, CommandRegistry } from '@theia/core/lib/common/command';
import { Disposable } from '@theia/core/shared/vscode-languageserver-protocol';

export const CustomBreadcrumbsCommand: Command = { id: 'custom-breadcrumbs:command' };

@injectable()
export class CustomBreadcrumbsWidgetContribution extends AbstractViewContribution<CustomBreadcrumbsWidget> {

    constructor() {
        super({
            widgetId: CustomBreadcrumbsWidget.ID,
            widgetName: CustomBreadcrumbsWidget.LABEL,
            defaultWidgetOptions: { area: 'left' },
            toggleCommandId: CustomBreadcrumbsCommand.id
        });
    }

    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(CustomBreadcrumbsCommand, {
            execute: () => super.openView({ activate: false, reveal: true })
        });
    }

    registerMenus(menus: MenuModelRegistry): void {
        super.registerMenus(menus);
    }

}

export const CustomBreadcrumbType = Symbol('CustomBreadcrumbType');

@injectable()
export class CustomBreadcrumbsContribution implements BreadcrumbsContribution {

    type: symbol = CustomBreadcrumbType;

    priority: number = 100;

    protected readonly onDidChangeBreadcrumbsEmitter = new Emitter<URI>();

    get onDidChangeBreadcrumbs(): Event<URI> {
        return this.onDidChangeBreadcrumbsEmitter.event;
    }

    computeBreadcrumbs(uri: URI): MaybePromise<Breadcrumb[]> {
        if (uri.scheme !== 'custom') {
            return [];
        }
        return [
            {
                id: 'root',
                label: 'Root',
                longLabel: 'The root element',
                iconClass: 'codicon codicon-folder default-folder-icon file-icon',
                type: CustomBreadcrumbType
            },
            {
                id: 'folder',
                label: 'Folder',
                longLabel: 'An intermediate folder',
                iconClass: 'codicon codicon-file default-file-icon file-icon',
                type: CustomBreadcrumbType
            },
            {
                id: 'leaf',
                label: 'Leaf element',
                longLabel: 'A leaf element',
                iconClass: 'markdown-icon medium-blue theia-file-icons-js file-icon',
                type: CustomBreadcrumbType
            }
        ];
    }

    attachPopupContent(breadcrumb: Breadcrumb, parent: HTMLElement): Promise<Disposable | undefined> {
        parent.innerHTML = '<div style="margin-left: 10px"><h3>' + breadcrumb.label + '</h3><p>We can show arbitrary content here and react to clicks.</p></div>';
        return Promise.resolve(undefined);
    }

}
