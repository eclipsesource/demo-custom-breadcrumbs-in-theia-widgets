import * as React from 'react';
import { injectable, postConstruct, inject } from '@theia/core/shared/inversify';
import { AlertMessage } from '@theia/core/lib/browser/widgets/alert-message';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService, URI } from '@theia/core';
import { Message, NavigatableWidget } from '@theia/core/lib/browser';

@injectable()
export class CustomBreadcrumbsWidget extends ReactWidget implements NavigatableWidget {

    static readonly ID = 'custom-breadcrumbs:widget';
    static readonly LABEL = 'CustomBreadcrumbs Widget';

    @inject(MessageService)
    protected readonly messageService!: MessageService;

    @postConstruct()
    protected async init(): Promise<void> {
        this.id = CustomBreadcrumbsWidget.ID;
        this.title.label = CustomBreadcrumbsWidget.LABEL;
        this.title.caption = CustomBreadcrumbsWidget.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'fa fa-window-maximize'; // example widget icon.
        this.update();
    }

    render(): React.ReactElement {
        const header = `This is a sample widget which simply calls the messageService
        in order to display an info message to end users.`;
        return <div id='widget-container'>
            <AlertMessage type='INFO' header={header} />
            <button id='displayMessageButton' className='theia-button secondary' title='Display Message' onClick={_a => this.displayMessage()}>Display Message</button>
        </div>
    }

    protected displayMessage(): void {
        this.messageService.info('Congratulations: CustomBreadcrumbs Widget Successfully Created!');
    }

    protected onActivateRequest(msg: Message): void {
        super.onActivateRequest(msg);
        const htmlElement = document.getElementById('displayMessageButton');
        if (htmlElement) {
            htmlElement.focus();
        }
    }

    getResourceUri(): URI | undefined {
        return new URI('custom://root/folder/leaf');
    }

    createMoveToUri(resourceUri: URI): URI | undefined {
        return undefined;
    }

}
