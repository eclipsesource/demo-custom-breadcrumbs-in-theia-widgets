import { ContainerModule } from '@theia/core/shared/inversify';
import { CustomBreadcrumbsWidget } from './custom-breadcrumbs-widget';
import { CustomBreadcrumbsContribution, CustomBreadcrumbsWidgetContribution } from './custom-breadcrumbs-contribution';
import { bindViewContribution, BreadcrumbsContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';

export default new ContainerModule(bind => {
    bindViewContribution(bind, CustomBreadcrumbsWidgetContribution);
    bind(FrontendApplicationContribution).toService(CustomBreadcrumbsWidgetContribution);
    bind(CustomBreadcrumbsWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: CustomBreadcrumbsWidget.ID,
        createWidget: () => ctx.container.get<CustomBreadcrumbsWidget>(CustomBreadcrumbsWidget)
    })).inSingletonScope();

    bind(CustomBreadcrumbsContribution).toSelf().inSingletonScope();
    bind(BreadcrumbsContribution).toService(CustomBreadcrumbsContribution);
});
