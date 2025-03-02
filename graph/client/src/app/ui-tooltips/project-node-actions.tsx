import { ProjectNodeToolTipProps } from '@nrwl/graph/ui-tooltips';
import { getProjectGraphService } from '../machines/get-services';
import { useRouteConstructor } from '../util';
import { useNavigate } from 'react-router-dom';
import { TooltipButton, TooltipLinkButton } from '@nrwl/graph/ui-tooltips';
import { FlagIcon, MapPinIcon } from '@heroicons/react/24/solid';

export function ProjectNodeActions({ id }: ProjectNodeToolTipProps) {
  const projectGraphService = getProjectGraphService();
  const { start, end, algorithm } =
    projectGraphService.getSnapshot().context.tracing;
  const routeConstructor = useRouteConstructor();
  const navigate = useNavigate();

  function onExclude() {
    projectGraphService.send({
      type: 'deselectProject',
      projectName: id,
    });
    navigate(routeConstructor('/projects', true));
  }

  function onStartTrace() {
    navigate(
      routeConstructor(`/projects/trace/${encodeURIComponent(id)}`, true)
    );
  }

  function onEndTrace() {
    navigate(
      routeConstructor(
        `/projects/trace/${encodeURIComponent(start)}/${encodeURIComponent(
          id
        )}`,
        true
      )
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <TooltipLinkButton to={routeConstructor(`/projects/${id}`, true)}>
        Focus
      </TooltipLinkButton>
      <TooltipButton onClick={onExclude}>Exclude</TooltipButton>
      {!start ? (
        <TooltipButton
          className="flex flex-row items-center"
          onClick={onStartTrace}
        >
          <MapPinIcon className="mr-2 h-5 w-5 text-slate-500"></MapPinIcon>
          Start
        </TooltipButton>
      ) : (
        <TooltipButton
          className="flex flex-row items-center"
          onClick={onEndTrace}
        >
          <FlagIcon className="mr-2 h-5 w-5 text-slate-500"></FlagIcon>
          End
        </TooltipButton>
      )}
    </div>
  );
}
